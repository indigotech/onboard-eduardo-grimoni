export function validateEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function validatePassword(password: string) {
  return (
    password.length >= 7 && /\d/.test(password) && /[a-zA-Z]/.test(password)
  );
}
export function validateName(name: string) {
  return name.trim().length > 0;
}
export function validatePhone(phone: string) {
  return /^\d{11}$/.test(phone);
}
export function validateBirthdate(newBirthdate: Date) {
  const currentDate = new Date();
  const isValid = newBirthdate <= currentDate && !isNaN(newBirthdate.getTime());
  return isValid;
}
