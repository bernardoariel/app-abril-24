<template>
  <div class="card bg-white text-orangeCustom2 shadow-xl p-4 mb-16">
    <div
      role="alert"
      class="alert mb-5 alert-warning flex justify-center items-center bg-orangeCustom3Translucent"
    >
      <span class="font-bold text-center text-orangeCustom2"> {{ props.Producto }} </span>
    </div>
    <div role="alert" class="alert mb-5 bg-orange-300 flex justify-between">
      <span class="font-bold"> Contado = {{ formatPrice(precioContado) }} </span>
      <span class="font-bold"> Debito = {{ formatPrice(precioDebito) }} </span>
      <span class="font-bold"> Lista = {{ formatPrice(props.Precio) }} </span>
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
                <td class="text-gray-800">{{ tarjeta.NCuota }}</td>
                <!--  <td>{{ tarjeta.Interes }}%</td> -->
                <!-- Precio por cuota con condición -->
                <td class="text-gray-800" v-if="tarjeta.NCuota === 1">
                  {{ formatPrice(precioLista * (1 + tarjeta.Interes / 100)) }}
                </td>
                <td v-else class="text-gray-800">
                  {{
                    formatPrice(
                      (precioLista * (1 + (tarjeta.Interes / 100) * tarjeta.NCuota)) /
                        tarjeta.NCuota,
                    )
                  }}
                </td>
                <td class="font-bold">
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
  Imagen: string | null;
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
const props = withDefaults(defineProps<Props>(), {
  Imagen: '',
});

// Precio de lista basado en la prop Precio
const precioLista = ref(props.Precio);
const precioContado = computed(() => {
  return precioLista.value * 0.82; // 18% de descuento
});
const precioDebito = computed(() => {
  return precioLista.value * 0.9; // 10% de descuento
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

      // Filtrar cuotas solo si CodForPago es "CRE"
      if (tarjeta.CodForPago === 'CRE') {
        const cuotasPermitidas = [1, 3, 6, 12, 15, 18];
        if (cuotasPermitidas.includes(tarjeta.NCuota)) {
          acc[tarjeta.CodForPago].push(tarjeta);
        }
      } else {
        acc[tarjeta.CodForPago].push(tarjeta);
      }
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
