import { useState } from "react";
import TextInput from "./TextInput";
import validationRules from "../utils/validationRules";
import { formatAmount, formatDateYYMMDD } from "../utils/formatters";

const FIELDS = [
  "20",
  "23B",
  "32A",
  "33B",
  "50K",
  "52A",
  "57A",
  "59",
  "70",
  "71A",
  "71F",
];

const fieldPlaceholder = {
  20: "Reference No.",
  "23B": "CRED",
  "32A": "DateCurrencyAmount",
  "33B": "CurrencyAmount",
  "50K": "Creditor IBAN, Name, Address",
  "52A": "Sender BIC",
  "57A": "Receiver BIC",
  59: "Receiver IBAN",
  70: "Transaction Purpose",
  "71A": "BEN",
  "71F": "CurrencyCharge",
};

const SwiftFileForm = () => {
  const [values, setValues] = useState(
    Object.fromEntries(FIELDS.map((f) => [f, ""])),
  );
  const [amountData, setAmountData] = useState({
    date: "",
    currency: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // const upperValue = value.toUpperCase();

    setValues((prev) => ({ ...prev, [name]: value }));

    const rule = validationRules[name];
    if (!rule) return;

    setErrors((prev) => ({
      ...prev,
      [name]: rule.regex.test(value) ? "" : rule.error,
    }));
  };

  const handleAmountChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...amountData, [name]: value };
    setAmountData(updated);

    const datePart = formatDateYYMMDD(updated.date);
    const ccy = updated.currency.toUpperCase();
    const amt = formatAmount(updated.amount);

    setValues((prev) => ({
      ...prev,
      "32A": datePart && ccy && amt ? `${datePart}${ccy}${amt}` : "",
      "33B": ccy && amt ? `${ccy}${amt}` : "",
    }));
  };

  //   const allFilled = Object.values(values).every((value) => value.trim() !== "");

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Swift File Creation</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <form className="space-y-8 min-w-64">
          {/* Transaction Details */}

          <section className="space-y-4">
            <h3 className="font-semibold">Transaction Details</h3>
            <TextInput
              field="20"
              value={values["20"]}
              onChange={handleChange}
              error={errors["20"]}
              required
            />
            <TextInput
              field="23B"
              value={"CRED"}
              // onChange={handleChange}
              disabled
              error={errors["23B"]}
              required
            />
          </section>

          {/* Amounts */}
          <section className="space-y-4">
            <h3 className="font-semibold">Amounts</h3>

            {/* User Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Value Date</label>
                <input
                  type="date"
                  name="date"
                  value={amountData.date}
                  onChange={handleAmountChange}
                  className="border rounded-md px-3 py-2 w-full"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Currency</label>
                <input
                  type="text"
                  name="currency"
                  maxLength={3}
                  placeholder="USD"
                  value={amountData.currency}
                  onChange={handleAmountChange}
                  className="border rounded-md px-3 py-2 w-full uppercase"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Amount</label>
              <input
                type="text"
                name="amount"
                placeholder="12345,67"
                value={amountData.amount}
                onChange={handleAmountChange}
                className="border rounded-md px-3 py-2 w-full"
                required
              />
            </div>

            {/* Generated SWIFT Fields (Read-only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput field="32A" value={values["32A"]} readOnly />
              <TextInput field="33B" value={values["33B"]} readOnly />
            </div>
          </section>

          {/* Parties */}
          <section className="space-y-4">
            <h3 className="font-semibold">Parties</h3>
            <TextInput
              field="50K"
              value={values["50K"]}
              onChange={handleChange}
              error={errors["50K"]}
              required
            />
            <TextInput
              field="52A"
              value={values["52A"]}
              onChange={handleChange}
              error={errors["52A"]}
              required
            />
            <TextInput
              field="57A"
              value={values["57A"]}
              onChange={handleChange}
              error={errors["57A"]}
              required
            />
            <TextInput
              field="59"
              value={values["59"]}
              onChange={handleChange}
              error={errors["59"]}
              required
            />
          </section>

          {/* Additional Info */}
          <section className="space-y-4">
            <h3 className="font-semibold">Additional Information</h3>
            <TextInput
              field="70"
              value={values["70"]}
              onChange={handleChange}
              error={errors["70"]}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                field="71A"
                value={"BEN"}
                disabled
                // onChange={handleChange}
                error={errors["71A"]}
                required
              />
              <TextInput
                field="71F"
                value={values["71F"]}
                onChange={handleChange}
                error={errors["71F"]}
              />
            </div>
          </section>
        </form>

        <div className="sticky top-4 self-start">
          <h2 className="font-semibold mb-2">Preview</h2>

          <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap">
            {`{1:F01ABDIEGCAXXX00000000000}{2:01030000991231BARC${values["52A"].slice(4) || "--NULL--"}X00000000009912310000N}{3:{108:25C0816470809700}{111:001}{121:b586d8f5-10fe-43f0-ad0d-40cb466486f6}}{4:\n` +
              FIELDS.map((field) => `:${field}:${values[field]}`).join("\n") +
              `,\n-}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SwiftFileForm;
