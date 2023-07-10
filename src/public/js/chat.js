const socket = io();
let user;

const chatbox = document.getElementById("chatbox");

chatbox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatbox.value.trim() });
      chatbox.value = "";
    }
  }
});

Swal.fire({
  title: "Ingrese el email con el que se registro a nuestra web",
  input: "text",
  inputValidator: (value) => {
    return !value && "Es necesario un Email para ingresar";
  },
  toast: true,
}).then((result) => {
  user = result.value;
  let usuario = {
    user: user,
  };
  socket.emit("authenticated", usuario);
});

socket.on("messageLogs", (data) => {
  if (!user) return;

  let log = document.getElementById("messageLogs");
  let messages = "";

  data.forEach((message) => {
    const userName = message.user.email; // Obtén el correo electrónico del usuario en lugar del ID
    messages += `${userName}: ${message.message} <br/>`;
  });

  log.innerHTML = messages;
});

socket.on("newUserConnected", (data) => {
  if (!user) return;

  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    title: `${data.user.email} ingreso a la sala`, // Mostrar el correo electrónico en lugar del ID
    icon: "success",
  });
});