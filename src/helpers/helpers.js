// import { readFile, writeFile } from 'node:fs/promises';

// export const readFileAsync = async (filePath) => {
//   const validFilePath = new URL(filePath, import.meta.url);
//   const data = await readFile(validFilePath, { encoding: 'utf8' });
//   return data;
// };

// export const writeFileAsync = async (filePath, data) => {
//   const addr = new URL(filePath, import.meta.url);
//   await writeFile(addr, data, { encoding: 'utf8' });
// };

// export const readFileAsync = async (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       resolve(event.target.result);
//     };
//     reader.onerror = (event) => {
//       reject(event.target.error);
//     };
//     reader.readAsText(file);
//   });
// };

// function readFile(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       resolve(event.target.result);
//     };

//     reader.onerror = (event) => {
//       reject(event.target.error);
//     };

//     reader.readAsText(file);
//   });
// }
// console.log(readFile('../../database/users/user.json'));
// export { readFile };
