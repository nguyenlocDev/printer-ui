/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRandomTime(dateString: string) {
  const date = new Date(dateString);

  // Tạo giờ phút giây ngẫu nhiên
  const randomHour = Math.floor(Math.random() * 24);
  const randomMinute = Math.floor(Math.random() * 60);
  const randomSecond = Math.floor(Math.random() * 60);

  // Áp dụng giờ ngẫu nhiên vào ngày
  date.setHours(randomHour, randomMinute, randomSecond);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${dayName} ${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

//PAYMENIT RANDOM METHOD
const generateRandomNumberString = (length: number) => {
  if (length < 1) return "0";
  const characters = "0123456789";
  let result = "0";
  for (let i = 1; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
export function convertDateToYYYYMMDD(dateStr: string) {
  // Bảng ánh xạ tên tháng
  const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  // Kiểm tra đầu vào
  if (!dateStr || typeof dateStr !== "string") {
    throw new Error("Đầu vào phải là chuỗi ngày tháng hợp lệ");
  }

  const parts = dateStr.split(" ");
  if (parts.length !== 5) {
    throw new Error("Định dạng ngày tháng không đúng");
  }

  const day = parts[1];
  const month = monthMap[parts[2] as keyof typeof monthMap];
  const year = parts[3];

  // Kiểm tra các thành phần
  if (!month) {
    throw new Error("Tháng không hợp lệ");
  }
  if (!/^\d{2}$/.test(day)) {
    throw new Error("Ngày không hợp lệ");
  }
  if (!/^\d{4}$/.test(year)) {
    throw new Error("Năm không hợp lệ");
  }

  return `${year}${month}${day}`;
}
export function randomNumber() {
  const digits = Math.random() < 0.5 ? 2 : 3;
  let result = "";
  for (let i = 0; i < digits; i++) {
    const digit = Math.floor(Math.random() * 9) + 1;
    result += digit;
  }
  return result;
}
export function convertStringToUpperCase(str: string) {
  if (!/^\d{1,3}$/.test(str)) {
    return "Đầu vào không hợp lệ, cần chuỗi số có 1 hoặc 2 ký tự.";
  }

  const mapping = {
    "0": "p",
    "1": "q",
    "2": "w",
    "3": "e",
    "4": "r",
    "5": "t",
    "6": "y",
    "7": "u",
    "8": "i",
    "9": "o",
  };

  return str
    .split("")
    .map((digit) => mapping[digit as keyof typeof mapping].toUpperCase())
    .join("");
}
// Hàm tạo transId ngẫu nhiên theo định dạng của MOMOQR/VNPAY
const generateRandomTransId = () => {
  const characters = "0123456789aefbc"; // Chỉ dùng số và các chữ cái a, e, f, b, c
  const getRandomString = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const part1 = getRandomString(8); // 8 ký tự (trước đây là 6, nhưng điều chỉnh theo substring(2, 10))
  const part2 = getRandomString(4); // 4 ký tự
  const part3 = getRandomString(4); // 4 ký tự
  const part4 = getRandomString(4); // 4 ký tự
  const part5 = getRandomString(6); // 6 ký tự
  const part6 = getRandomString(6); // 6 ký tự
  return `${part1}-${part2}-${part3}-${part4}-${part5}${part6}`; // Định dạng: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
};

// Ví dụ sử dụng
console.log(generateRandomTransId());

// Hàm tạo billNo ngẫu nhiên
const generateRandomBillNo = () => {
  return generateRandomNumberString(12); // 12 số ngẫu nhiên, bắt đầu bằng 0
};

export function randomPaymentMethod() {
  const paymentMethods = ["Cash", "Card", "VNPAY", "MomoQR"];
  const randomIndex = Math.floor(Math.random() * paymentMethods.length);
  return paymentMethods[randomIndex];
}

export const paymentType = (
  type: string,
  total: number,
  codeStore: string,
  date: string
) => {
  const payAmount = randomCustomerPayment(total);

  if (type === "Cash") {
    return {
      type: type,
      totalPay: payAmount,
      changeDue: payAmount - total,
    };
  } else if (type === "Card") {
    const cardTypes = ["VISA", "DEBIT", "MASTERCARD"];
    const selectedCardType =
      cardTypes[Math.floor(Math.random() * cardTypes.length)];

    return {
      type: type,
      totalPay: total,
      cardType: selectedCardType,
      referenceId: generateRandomNumberString(12),
      apprCode: generateRandomNumberString(6),
      tranID: generateRandomNumberString(6),
      changeDue: 0,
    };
  } else if (type === "VNPAY") {
    return {
      type: type,
      totalPay: total,
      billNo:
        codeStore.slice(6) +
        "_02_" +
        convertDateToYYYYMMDD(date) +
        date.slice(-8).split(":")[0] +
        date.slice(-8).split(":")[1] +
        date.slice(-8).split(":")[2] +
        generateRandomNumberString(3), // Ví dụ: "025041504503349"
      transId: generateRandomNumberString(9), // Ví dụ: "615618"
      changeDue: 0,
    };
  } else if (type === "MomoQR") {
    return {
      type: type,
      totalPay: total,
      billNo:
        convertDateToYYYYMMDD(date) +
        date.slice(-8).split(":")[0] +
        date.slice(-8).split(":")[1] +
        date.slice(-8).split(":")[2] +
        generateRandomNumberString(3), // Ví dụ: "25041504503349"
      transId: generateRandomTransId(), // Ví dụ: "3a194875-325e-ffff-bfc2-7"
      note: "Khong doi tra hang khi thanh toan bang Momo",
      changeDue: 0,
    };
  }
  return null;
};

export function randomCustomerPayment(billAmount: number) {
  const roundAmounts = [
    1000, 2000, 50000, 10000, 50000, 100000, 200000, 500000, 1000000,
  ];

  const getRandomElement = (array: any) =>
    array[Math.floor(Math.random() * array.length)];

  const paymentType = Math.random() < 0.5 ? 0 : 1;

  if (paymentType === 0) {
    const validRounds = roundAmounts.filter((amount) => amount >= billAmount);
    if (validRounds.length === 0) {
      const maxRound = roundAmounts[roundAmounts.length - 1];
      return maxRound + (billAmount - maxRound);
    }
    return getRandomElement(validRounds);
  } else {
    const baseRound = getRandomElement(
      roundAmounts.filter((amount) => amount < billAmount)
    );
    const remaining = billAmount - baseRound;
    return baseRound + remaining;
  }
}
