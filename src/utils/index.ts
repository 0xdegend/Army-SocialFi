import { toast } from "react-hot-toast";
import { getStorageValue } from "./localStorage";

export const getSimplifiedError = (error: object | any) => {
  if (!error.response) {
    toast.error(
      "Something went wrong, check your internet and please try again"
    );
    return "Something went wrong, check your internet and please try again";
  }
  const errorObject = error?.response?.data;
  if (error.response?.status === 500) {
    toast.error("Sorry an unexpected error occurred.");
    return "Sorry an unexpected error occurred.";
  }
  if (error.response?.status === 400) {
    if (Array.isArray(errorObject)) {
      toast.error(errorObject[0]?.message);
    } else if (errorObject?.message === "Email already taken") {
      toast.error("Phone or Email already taken");
    } else {
      toast.error(errorObject?.message);
    }
  }
  if (error.response?.status === 403) {
    if (errorObject?.message === "Email already taken") {
      toast.error("Phone or Email already taken");
    } else {
      toast.error(error?.response?.data?.message);
    }
  }
  if (error.response?.status === 409) {
    if (errorObject?.message === "Not Available") {
      toast.error("This time is not available");
    } else {
      toast.error(error?.response?.data?.message);
    }
  }
  if (error.response.status === 404) {
    toast.error(errorObject?.message ?? "Resource Not Found!");
    // console.error(error?.response?.error);
    return errorObject?.message;
  } else if (error?.response?.status === 401) {
    toast.error(`Stand down, Soldier! Claim your daily points by signing in.`);
    //toast.error(errorObject?.message);
    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
    localStorage.setItem("userAuth", ""); //log here and perform action below
    localStorage.removeItem("privy:token");
    if (errorObject?.message === "Please authenticate") {
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
    if (errorObject?.message === "Forbidden: Not Verified or Not Permitted") {
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    }
    return "Token has expired, please log in";
  } else {
    //Check for possible phone number unique issues
    return "Something went wrong";
  }
};

export function truncateWalletAddress(
  address: string | undefined | null
): string {
  if (!address) {
    return "N/A"; // Return a default value if address is null or undefined
  }
  if (address.length <= 7) {
    return address; // No truncation needed if the address is too short
  }
  return `${address.slice(0, 10)}...${address.slice(-10)}`;
}
export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export function formatDateTime(isoString: string | any): {
  date: string;
  time: string;
} {
  const date = new Date(isoString);

  // Extracting date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  // Extracting time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedDate = `${day} - ${month} - ${year}`;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function convertDateFormat(dateString: any) {
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

  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
}
export function convertMonthDayFormat(dateString: any) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Julu",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];

  return `${day}-${month}`;
}

export function isPasswordValid(password: string): boolean {
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return PASSWORD_REGEX.test(password);
}
export function hasLowerCaseLetter(password: string): boolean {
  const PASSWORD_REGEX = /[a-z]+/;
  return PASSWORD_REGEX.test(password);
}
export function hasUpperCaseLetter(password: string): boolean {
  const PASSWORD_REGEX = /[A-Z]+/;
  return PASSWORD_REGEX.test(password);
}
export function hasNumber(password: string): boolean {
  const PASSWORD_REGEX = /\d+/;
  return PASSWORD_REGEX.test(password);
}
export function hasLengthEight(password: string): boolean {
  const PASSWORD_REGEX = /[a-zA-Z\d]{8,}$/;
  return PASSWORD_REGEX.test(password);
}

export function isEmailValid(value: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  );
}

export function convertTimeStamp(timestamp: any) {
  const firebaseTime = new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
  );
  const date = firebaseTime.toDateString();
  // const atTime = firebaseTime.toLocaleTimeString();
  return date;
}

export const handleInviteRedirect = (timer?: number) => {
  const inviteUrl = getStorageValue("inviteUrl");
  if (inviteUrl) {
    if (timer) {
      window.setTimeout(() => {
        window.location.replace(inviteUrl);
      }, timer);
    } else {
      window.location.replace(inviteUrl);
    }
  }
};

export function getCurrentFormattedDate(): string {
  const date: Date = new Date(); // Get the current date

  // Define the options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // Create a new instance of Intl.DateTimeFormat with the options
  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    "en-GB",
    options
  );

  // Format the date and return it with a comma
  return formatter.format(date).replace(" ", ", ");
}

export const generateCode = () => {
  // create an array of possible characters
  let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // create an empty string to store the result
  let result = "";

  // loop 8 times
  for (let i = 0; i < 8; i++) {
    // pick a random index from the array
    let index = Math.floor(Math.random() * chars.length);
    // append the character at that index to the result
    result += chars[index];
  }

  // print the result

  return result;
};

export const filterByState = (array: any, state: string) => {
  return array?.filter((obj: any) => obj.state === state);
};

export const capitalizeWords = (words: string) => {
  return words?.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};
export function convertDate(dateString: string | number | Date) {
  let date = new Date(dateString);
  return date.getTime();
}
export function convertDateToNumeric(dateString: any) {
  const date = new Date(dateString);
  const numericRepresentation = date.getTime();
  return numericRepresentation;
}

export function convertTimeToAMPM(time: any) {
  // Split the time into hours and minutes
  let timeArray = time.split(":");
  let hours = parseInt(timeArray[0]);
  let minutes = parseInt(timeArray[1]);

  // Determine if it's AM or PM
  var meridiem = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // "0" should be "12" for 12-hour format

  // Pad the hours and minutes with leading zeros if necessary
  let finalHour = hours < 10 ? "0" + hours : hours;
  let finalMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Return the formatted time
  return finalHour + ":" + finalMinutes + " " + meridiem;
}

export function formatDate(dateString: string) {
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

  // Create a new Date object from the provided string
  const date = new Date(dateString);

  // Extract the day, month, and year from the Date object
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Format the date string in the desired format
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export function convertDateTime(dateTimeStr: string) {
  const date = new Date(dateTimeStr);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const ampm = hour >= 12 ? "pm" : "am";
  const hour12 = hour % 12 || 12;
  const timeZone = "WAT";

  const formattedDate = `${dayOfWeek}. ${day} ${month} ${year}`;
  const formattedTime = `${hour12}:${minute
    .toString()
    .padStart(2, "0")}${ampm} ${timeZone}`;
  const realDate = {
    date: formattedDate,
    time: formattedTime,
  };
  return realDate;
}

function isPowerOf2(number: number) {
  // If the number is 0, it is not a power of 2
  if (number === 0) {
    return false;
  }

  // Check if the number is divisible by 2 without a remainder
  while (number % 2 === 0) {
    number = number >> 1;
  }

  // If the number is 1, it is a power of 2
  if (number === 1) {
    return true;
  }

  // Otherwise, the number is not a power of 2
  return false;
}

export function closestPowerOf2(number: number) {
  // Find the next power of 2 greater than or equal to the number
  var nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(number)));

  // If the number is a power of 2, return the number
  if (isPowerOf2(number)) {
    return number;
  }

  // Otherwise, return the next power of 2
  return nextPowerOf2;
}

export function convertDateToFormat(dateString: any) {
  const date = new Date(dateString);
  const milliseconds = date.getTime();

  return milliseconds.toString();
}

// Certainly! Here's a JavaScript function that converts a date string in the format "YYYY-MM-DD" to the desired format "1681347521180":

// javascript
// Copy code
// function convertDateToFormat(dateString) {
//   const date = new Date(dateString);
//   const milliseconds = date.getTime();

//   return milliseconds.toString();
// }

// Example usage
// const inputDate = '2023-07-24';
// const convertedFormat = convertDateToFormat(inputDate);
// console.log(convertedFormat); // Output: "1681347521180"

export function sortByUpdatedAt(array: any) {
  let arrayToSort = [...array];

  arrayToSort.sort(function (a: any, b: any) {
    let dateA: any = new Date(a.updatedAt).getTime();
    let dateB: any = new Date(b.updatedAt).getTime();
    return dateB - dateA; // Sort in descending order
  });
  return array;
}

export function reverseArray(arr: any) {
  if (!Array.isArray(arr)) {
    throw new Error("Input is not an array.");
  }

  if (arr.length < 2) {
    return arr; // No need to reverse a single item or empty array
  }

  const reversedArray = [...arr]; // Create a shallow copy of the original array

  const firstItem = reversedArray.shift(); // Remove the first item and store it
  const lastItem = reversedArray.pop(); // Remove the last item and store it

  reversedArray.unshift(lastItem); // Add the last item to the beginning
  reversedArray.push(firstItem); // Add the first item to the end

  return reversedArray;
}

export const sortByDateField = <T = any>(arr: T[], options: any): T[] => {
  const { field = "", order = "desc" } = options;

  if (!field) return arr;

  const arrayToSort = [...arr];

  arrayToSort.sort((a: any, b: any) => {
    const dateA = new Date(a[field]).getTime();
    const dateB = new Date(b[field]).getTime();

    return order === "asc" ? dateA - dateB : dateB - dateA;
  });

  return arrayToSort;
};

export function getRandomNumber() {
  // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
  const randomNumber = Math.random();

  // Scale the decimal number to be between 1 and 100 (both inclusive)
  const scaledNumber = Math.floor(randomNumber * 100) + 1;

  return scaledNumber;
}
export function getRandomIndex(number: any) {
  // Generate a random decimal number between 0 (inclusive) and 1 (exclusive)
  const randomNumber = Math.random();

  // Scale the decimal number to be between 1 and 100 (both inclusive)
  const scaledNumber = Math.floor(randomNumber * number);

  return scaledNumber;
}

export function convertDateFormatInput(inputDate: any) {
  // Parse the input date string
  const dateObj = new Date(inputDate);

  // Get the individual date components
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  // Combine the components into the desired format
  const outputDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return outputDate;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const currentMonth = months[new Date().getMonth()];
