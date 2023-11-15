import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';

const ReturnPolicyPage = () => {
  return (
    <ShopLayout
      title='Política de devoluciones'
      pageDescription='Política de devoluciones de Margaret Art Store'
    >
      <Box
        display='flex'
        justifyContent='center'
        sx={{ display: 'flex', flexDirection: 'column', margin: '2rem' }}
      >
        <Typography
          variant='body1'
          sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
        >
          POLITICA DE DEVOLUCIONES
          
        </Typography>
          MARGARETARTSTORE no acepta cambios ni devoluciones de obras entregadas
          en condiciones adecuadas o debido a errores en la compra del cliente. No obstante,
          existen circunstancias excepcionales que justificarán el pedido de cambio o devolución, 
          se citan las siguientes excepciones:
        <ul>
          <li>
            <strong>Envío Incorrecto:</strong> En caso de que se envíe la obra
            de arte incorrecta, es decir, una obra diferente a la que el cliente
            ordenó.
          </li>
          <li>
            <strong>Obra Dañada o Defectuosa:</strong> Si la obra de arte llega
            al cliente en condiciones dañadas o con defectos evidentes que
            afectan significativamente su valor o apariencia.
          </li>
          <li>
            <strong>Incumplimiento de Plazos de Entrega:</strong> Si la obra de
            arte no se entrega dentro del plazo acordado y esto resulta en un
            perjuicio significativo para el comprador (ver términos y
            condiciones).
          </li>
        </ul>
          De ser así, el usuario tiene un plazo de 14 días naturales a partir del
          día siguiente a la recepción del pedido para enviar la solicitud de la
          compraventa y devolver o cambiar la(s) obra(s).
        <p>Para ello, el usuario puede:</p>
        Enviar un correo electrónico a info@margaret-art.com exponiendo su
        solicitud de cambio o devolución; todos los casos serán evaluados.
        <p>
          El servicio de Atención al Cliente se comunicará con usted para
          informar sobre el estado de la solicitud y le proporcionará
          asesoramiento sobre la devolución o cambio, según corresponda.
        </p>
        <ul>
          <li>
            1. MARGARETARTSTORE se encargará de gestionar con la empresa de
            transporte la recogida en el lugar y hora acordado con el cliente.
          </li>
          <li>
            2. Enviar la(s) obra(s) a la siguiente dirección: Primer Presidente
            2346, Asunción, Paraguay.
          </li>
        </ul>
        <p>
          En ambos casos, MARGARETARTSTORE NO ofrece costes de transporte de
          devolución gratuitos. Además, la empresa solo aceptará devoluciones
          que cumplan con los siguientes requisitos:
        </p>
        <ul>
          <li>1.Ejercitarse dentro del plazo establecido.</li>
          <li>
            2.La devolución debe realizarse en un embalaje que garantice el
            perfecto estado de la(s) obra(s).
          </li>
        </ul>
        <p>
          Una vez que el autor de la obra original haya recibido la(s) obra(s),
          verificará que se encuentren en perfecto estado y validará el estado
          de cuentas del usuario en función del importe pagado, los costes de
          devolución y gastos asociados.
        </p>
        <ul>
          <li>
            El artista informará sobre la recepción de la obra y cualquier
            anomalía en el envío.
          </li>
          <li>
            MARGARETARTSTORE no asumirá ningún coste por la devolución de la
            obra.
          </li>
          <li>
            Del mismo modo, MARGARETARTSTORE se compromete a aceptar la
            devolución de la obra por retraso o imposibilidad en la entrega al
            cliente, por falta de documentación asociada al envío de la obra.
          </li>
          <li>
            El usuario puede optar por cambiar la obra devuelta por otra de su
            elección o por la devolución (refund) del saldo pendiente en su
            estado de cuentas.
          </li>
          <li>
            Si elige el cambio por otra obra, se calculará el saldo positivo o
            negativo del estado de cuentas respecto a la nueva compra y se
            procederá a saldar el saldo.
          </li>
          <li>
            MARGARETARTSTORE abonará el saldo en un plazo inferior a 30 días,
            utilizando la misma forma de pago que el usuario haya utilizado para
            la compra de la obra(s).
          </li>
        </ul>
      </Box>
    </ShopLayout>
  );
};

export default ReturnPolicyPage;
