export function getInitialPassword(fullName: string): string {
  if (!fullName) return "PASSWORD"; 

  const name = fullName.trim()

  const password = name
    .split("")
    .map(c => {
      if (c >= "A" && c <= "Z") {
        return String.fromCharCode("A".charCodeAt(0) + ("Z".charCodeAt(0) - c.charCodeAt(0)));
      } else if (c >= "a" && c <= "z") {
        return String.fromCharCode("a".charCodeAt(0) + ("z".charCodeAt(0) - c.charCodeAt(0)));
      } else {
        return c; 
      }
    })
    .join("");

  return password;
}