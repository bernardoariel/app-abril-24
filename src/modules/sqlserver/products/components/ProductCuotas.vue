<template>
  <div class="card bg-base-100 shadow-xl p-4 lg:flex lg:flex-col lg:items-start mb-16">
    <div v-for="(group, codTarjeta) in groupedTarjetas" :key="codTarjeta" class="mb-8">
      <div class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div class="collapse-title text-lg font-bold mb-4">
          {{ group[0].Nombre }} - {{ codTarjeta }}
        </div>
        <div class="collapse-content">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Cuotas</th>
                <th>Interes</th>
                <th>Precio Final</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tarjeta in group" :key="tarjeta.NCuota">
                <td>{{ tarjeta.NCuota }}</td>
                <td>{{ tarjeta.Interes }}</td>
                <td>{{ formatPrice(precioLista * tarjeta.Interes) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { formatPrice } from '../../../../common/helpers/formatPrice';
import { useFormaPagoPlanes } from '../../forma-pago-planes/composable/useFormaPagosPlanes';

// Definir las props
interface Props {
  CodProducto: string;
  Producto: string;
  Medida: string;
  Descripcion: string;
  Stock: number;
  Imagen: string;
  Precio: number;
}

const props = defineProps<Props>();

// Precio de lista basado en la prop Precio
const precioLista = ref(props.Precio);

// Obtener los datos de forma de pago planes
const { formaPagoPlanes } = useFormaPagoPlanes();

const arrayCreditos = ['CRE', 'TNA', 'TNP', 'TVI']; // Códigos de crédito

// Filtrar y agrupar los datos por CodForPago
const groupedTarjetas = computed(() => {
  return formaPagoPlanes.value.reduce((acc: Record<string, any[]>, tarjeta: any) => {
    if (arrayCreditos.includes(tarjeta.CodForPago)) {
      // Solo agregar si está en arrayCreditos
      if (!acc[tarjeta.CodForPago]) {
        acc[tarjeta.CodForPago] = [];
      }
      acc[tarjeta.CodForPago].push(tarjeta);
    }
    return acc;
  }, {});
});
</script>
