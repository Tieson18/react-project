const response = (message, data = null, success = true) => ({
  message,
  data,
  success,
});

const except = (obj, ...args) => {
  if (!obj) return;

  // GET A COPY OF THE OBJECT
  const objCopy = { ...obj };
  // LOOP THROUGH THE ARGS
  for (let arg of args) {
    delete objCopy[arg];
  }

  return objCopy;
};

const obj = {
  name: "test",
  password: "test",
  email: "test@example.com",
};

const rest = except(obj, "password");
console.log(rest);


const generateId=(prefix = "", length =8)=>{
  let id = prefix
  for (let i=0; i<length; i++){
    id += Math.floor(Math.random())*9
  }
  return id
}
console.log("ID: ",generateId("trx_"))

module.exports = {
  response,
  except,
  generateId,
};
