<template>
  <div class="card bg-orange-300 shadow-xl p-4 mb-16">
    <div role="alert" class="alert mb-5 alert-warning flex justify-center items-center">
      <span class="font-bold text-center text-white"> {{ props.Producto }} </span>
    </div>
    <div role="alert" class="alert mb-5 bg-orange-300 flex justify-between">
      <span class="font-bold"> Contado y Débito = {{ formatPrice(precioConDescuento) }} </span>
      <span class="font-bold"> Precio de Lista = {{ formatPrice(props.Precio) }} </span>
    </div>
    <div v-for="(group, codTarjeta) in groupedTarjetas" :key="codTarjeta" class="mb-8">
      <div class="collapse collapse-arrow bg-orange-200">
        <input type="checkbox" />
        <div class="collapse-title text-lg font-bold mb-4">
          {{ findFormaPagoById(codTarjeta)?.FormaPago || 'Sin nombre' }} - {{ codTarjeta }}
        </div>
        <div class="collapse-content">
          <table class="table w-full text-center">
            <thead>
              <tr>
                <th stu>Cuotas</th>
                <th stu>Importe Cuota</th>
                <th stu>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tarjeta in group" :key="tarjeta.NCuota">
                <td>{{ tarjeta.NCuota }}</td>
                <!--  <td>{{ tarjeta.Interes }}%</td> -->
                <!-- Precio por cuota con condición -->
                <td v-if="tarjeta.NCuota === 1">
                  {{ formatPrice(precioLista * (1 + tarjeta.Interes / 100)) }}
                </td>
                <td v-else>
                  {{
                    formatPrice(
                      (precioLista * (1 + (tarjeta.Interes / 100) * tarjeta.NCuota)) /
                        tarjeta.NCuota,
                    )
                  }}
                </td>
                <td>
                  {{ formatPrice(calculateTotal(tarjeta)) }}
                </td>
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
import { useFormaPago } from '../../forma-pago/composable/useFormaPago';

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

interface AttrLoader {
  size: number;
  color: string;
}
const ConfigLoader: AttrLoader = {
  size: 80,
  color: '#000',
};
const props = defineProps<Props>();

// Precio de lista basado en la prop Precio
const precioLista = ref(props.Precio);
const precioConDescuento = computed(() => {
  return precioLista.value * 0.82; // Aplica el 18% de descuento
});
// Obtener los datos de forma de pago planes
const { formaPagoPlanes } = useFormaPagoPlanes();
const { findFormaPagoById } = useFormaPago();
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

const calculateTotal = (tarjeta: any) => {
  const cuota =
    (precioLista.value * (1 + (tarjeta.Interes / 100) * tarjeta.NCuota)) / tarjeta.NCuota;
  return cuota * tarjeta.NCuota;
};
</script>
