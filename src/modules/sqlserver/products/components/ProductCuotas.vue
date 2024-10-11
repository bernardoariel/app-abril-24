<template>
  <!-- <div class="card bg-base-100 shadow-xl p-4 lg:flex lg:flex-col lg:items-start mb-16">
    <div v-for="(group, codTarjeta) in groupedTarjetas" :key="codTarjeta" class="mb-8">
      <h2 class="text-lg font-bold mb-4">{{ codTarjeta }}</h2>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Cuotas</th>
            <th>Coeficiente</th>
            <th>Precio Final</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tarjeta in group" :key="tarjeta.NCuota">
            <td>{{ tarjeta.NCuota }}</td>
            <td>{{ tarjeta.Coeficiente }}</td>
            <td>{{ formatPrice(precioLista * tarjeta.Coeficiente) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { formatPrice } from '../../../../common/helpers/formatPrice';
import { useFormaPago } from '../../forma-pago/composable/useFormaPago';
import { useFormaPagoPlanes } from '../../forma-pago-planes/composable/useFormaPagosPlanes';

interface Props {
  CodProducto: string;
  Producto: string;
  Medida: string;
  Descripcion: string;
  Stock: number;
  Imagen: string;
  Medida: string;
  Precio: number;
}

const props = defineProps<Props>();

const precioLista = ref(props.Precio);
const { formaPago } = useFormaPago();
const { formaPagoPlanes } = useFormaPagoPlanes();
console.log('formaPagoPlanes::: ', formaPagoPlanes);
console.log('formaPago::: ', formaPago);
</script>
