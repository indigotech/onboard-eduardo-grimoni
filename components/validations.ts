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
  return /^\d{10,11}$/.test(phone);
}
export function validateBirthdate(birthdate: string) {
  const currentDate = new Date();
  const selectedDate = new Date(birthdate);
  return selectedDate <= currentDate && !isNaN(selectedDate.getTime());
}
