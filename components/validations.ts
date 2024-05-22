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
export function validateBirthdate(birthdate: string) {
  const currentDate = new Date();
  const parts = birthdate.split('/');
  const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  const selectedDate = new Date(formattedDate);
  return selectedDate <= currentDate && !isNaN(selectedDate.getTime());
}
