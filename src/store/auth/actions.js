import { Notify } from "quasar";
import { api } from "src/boot/axios";

export function someAction(/* context */) {}

export async function login({ commit }, user) {
  try {
    const objUser = {
      identifier: user.name,
      password: user.password,
    };
    if (objUser.identifier == "" || objUser.password == "") {
      Notify.create({
        color: "red-7",
        textColor: "white",
        icon: "las la-exclamation-triangle",
        message: "Usuario o contraseña en blanco",
      });
    } else {
      await api.post(`/api/auth/local`, objUser).then((res) => {
        commit("setToken", res.data.jwt);
        commit("setUser", JSON.stringify(res.data.user));

        localStorage.setItem("jwt", res.data.jwt);
        localStorage.setItem("userData", JSON.stringify(res.data.user));

        Notify.create({
          textColor: "white",
          icon: "check",
          message: "Bienvenido " + res.data.user.username,
        });
      });
    }
  } catch (error) {
    console.log(error);
    if (error) {
      Notify.create({
        type: "negative",
        message: "Usuario o contraseña incorrectos",
      });
    }
  }
}

export function getToken({ commit }) {
  if (localStorage.getItem("jwt")) {
    commit("setToken", localStorage.getItem("jwt"));
  } else {
    commit("setToken", null);
  }
}

export function getUser({ commit }) {
  if (localStorage.getItem("userData")) {
    commit("setUser", localStorage.getItem("userData"));
  } else {
    commit("setUser", {});
  }
}

export function logout({ commit }) {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userData");
  commit("setToken", null);
  commit("setUser", null);
}
