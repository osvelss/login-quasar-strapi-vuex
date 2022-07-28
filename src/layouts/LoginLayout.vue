<template>
  <q-layout>
    <div class="fullscreen row justify-center items-center">
      <div class="col-12 col-sm-7 col-md-3">
        <div class="my-card t-card q-py-lg">
          <q-card-section>
            <div class="text-h5">Login Quasar/Strapi - Vuex</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="login(usuario)" class="q-gutter-md">
              <q-input
                filled
                color="primary"
                v-model="usuario.name"
                label="Nombre de usuario"
              />

              <q-input
                v-model="usuario.password"
                filled
                color="primary"
                label="Contraseña"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div>
                <q-btn
                  unelevated
                  type="submit"
                  color="primary"
                  class="full-width"
                  :disable="cargando"
                >
                  <q-spinner-puff
                    color="white"
                    v-show="cargando"
                    class="q-pr-sm"
                  />
                  <span v-if="cargando === false"> Iniciar sesión</span>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </div>
      </div>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
/**
 * imports
 */
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

/**
 * variables
 */
const $q = useQuasar();
const $router = useRouter();
const $store = useStore();
const cargando = ref(false);
const isPwd = ref(true);

const usuario = ref({
  name: "",
  password: "",
});

/**
 * functions
 */
const login = (usuario) => {
  cargando.value = true;
  $store
    .dispatch("auth/login", usuario)
    .then(() => {
      cargando.value = false;
      $router.push("/");
    })
    .catch((error) => {
      console.log("error", error);
      cargando.value = false;
    });
};
</script>
