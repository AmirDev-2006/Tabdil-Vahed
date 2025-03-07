import { useState } from "react";

export default function Contex() {
    const [amount, setAmount] = useState('');
    const [fromUnit, setFromUnit] = useState('');
    const [toUnit, setToUnit] = useState('');
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleFromUnitChange = (event) => {
        setFromUnit(event.target.value);
    };

    const handleToUnitChange = (event) => {
        setToUnit(event.target.value);
    };
    const handleConvert = () => {
        // Convert amount to a number
        const numericValue = parseFloat(amount);

        // Validate inputs
        if (isNaN(numericValue)) {
            alert("لطفاً مقدار عددی معتبر وارد نمایید");
            return;
        }
        if (!fromUnit || !toUnit) {
            alert("لطفاً واحد مبدا و مقصد را انتخاب نمایید");
            return;
        }
        const data = {
            value: numericValue,
            from_unit: fromUnit,
            to_unit: toUnit,
        };
        console.log('Sending data:', JSON.stringify(data));
        fetch('https://unitconverter.liara.run/api/convert/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then((data) => {
                console.log('API Response:', data);
                setValue(data.result); // Use 'result' as per backend response
            })
            .catch((error) => {
                console.error('API Error:', error);
                setError(error.error || 'خطا در ارتباط با سرور');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex w-full font-vazir h-screen justify-center items-center">
            <div className="w-[450px] h-[500px] flex flex-col gap-y-5 rounded-2xl p-12 box-shadow">
                <h1 className="text-center text-2xl">تبدیل واحد</h1>
                <div className="w-full flex flex-col gap-y-2">
                    <p className="text-xl">مقدار عددی : </p>
                    <input
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full p-2 h-9 rounded-sm bg-gray-200"
                        type="number"
                        placeholder="مقدار را اینجا وارد کنید"
                    />
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <p className="text-xl">واحد مبدا :</p>
                    <select
                        value={fromUnit}
                        onChange={handleFromUnitChange}
                        className="w-full text-gray-500 h-10 bg-gray-200 rounded-sm"
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="gram">گرم</option>
                        <option value="kilogram">کیلوگرم</option>
                        <option value="pound">پوند</option>
                    </select>
                </div>
                <div className="w-full flex flex-col gap-y-2"><p className="text-xl">واحد مقصد :</p>
                    <select
                        value={toUnit}
                        onChange={handleToUnitChange}
                        className="w-full text-gray-500 h-10 bg-gray-200 rounded-sm"
                    >
                        <option value="">انتخاب کنید</option>
                        <option value="gram">گرم</option>
                        <option value="kilogram">کیلوگرم</option>
                        <option value="pound">پوند</option>
                    </select>
                </div>
                <div className="py-8">
                    <button
                        onClick={handleConvert}
                        disabled={loading}
                        className="w-full hover:bg-green-600 hover:text-slate-700 transition-colors text-white bg-slate-600 rounded-md h-12"
                    >
                        {loading ? 'در حال تبدیل...' : 'تبدیل واحد'}
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex box-shadow p-6 rounded-lg justify-between">
                    <p>مقدار تبدیل شده:</p>
                    <p className="text-2xl">{value}</p>
                </div>
            </div>
        </div>
    );
}