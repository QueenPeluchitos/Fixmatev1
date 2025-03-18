import users from './users.json';

export function fakeLogin(email, password) {
  return new Promise((resolve, reject) => {
    // Simula un retardo de 1.5 segundos
    setTimeout(() => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        console.log('Usuario, ', user);
        resolve({ status: 'success', user });
      } else {
        console.log('Credenciales incorrectas');
        reject(new Error('Credenciales incorrectas'));
      }
    }, 1500);
  });
}