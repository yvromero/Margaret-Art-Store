import { Box, Typography } from '@mui/material';
import { ShopLayout } from '@/components/layouts';

const ShippingPolitiesPage = () => {
  return (
    <ShopLayout
      title='Politicas de envío'
      pageDescription='Politicas de envío de obras por Margaret Art Store'
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
          POLÍTICAS DE ENVÍOS
        </Typography>
        <Typography
          variant='body1'
          sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
        >
          Entrega de las Obras adquiridas
        </Typography>
        MARGARETARTSTORE se encargará de la entrega de la obra al usuario
        mediante un Courier internacional o nacional de reconocido prestigio,
        siendo este el responsable final de la entrega en la dirección indicada
        por el usuario en el formulario de compra.
        <ul>
          <li>
            En caso de un intento de entrega infructuoso por parte de la
            compañía de transporte, se dejará un aviso para que el usuario pueda
            coordinar una nueva entrega.
          </li>
          <li>
            Si la compañía de transporte o MARGARETARTSTORE no logran contactar
            al usuario para coordinar la entrega en un plazo máximo de 15 días
            hábiles desde el primer intento, la compañía de transportes podrá
            proceder a la devolución de la obra al autor, en caso de ser
            original. En este caso, el usuario asumirá todos los gastos
            asociados (entrega, devolución y cualquier otra gestión).
          </li>
          <li>
            Al recibir la obra, el usuario debe verificar el estado del paquete
            e informar cualquier anomalía en el albarán de entrega. Además, si
            al abrir el paquete se detecta alguna anomalía en la obra, el
            usuario se compromete a comunicarlo a MARGARETARTSTORE por correo
            electrónico a info@margaretart.com, indicando el número de orden, en
            un plazo máximo de 24 horas posterior al momento de la recepción del
            paquete.
          </li>
          <li>
            En casos donde no se informe en este periodo, se entenderá que se
            acepta la obra en todas sus condiciones, y MARGARETARTSTORE no se
            hará responsable por los daños.
          </li>
        </ul>
        <Typography
          variant='body1'
          sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
        >
          POLÍTICAS DE ENTREGA DE LA OBRA
        </Typography>
        Por razones de seguridad, la obra solo se entregará al tarjetahabiente,
        quien deberá presentar un documento de identidad y el comprobante de
        pedido para validar los datos del comprador. En caso de que la persona
        no pueda recibir el pedido en la dirección asignada, el titular de la
        compra deberá enviar con anticipación la siguiente información al correo
        electrónico info@margaret-art.com:
        <ul>
          <li>
            Correo de autorización con las generales del titular de la compra y
            las generales de la persona autorizada, con los datos del pedido
            (número de orden).
          </li>
          <li>Foto legible de identificación del Titular de la Compra.</li>
          <li>Foto legible de identificación de la persona autorizada.</li>
        </ul>
        <Typography
          variant='body1'
          sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
        >
          TIEMPO DE ENTREGA
        </Typography>
        Los tiempos de entrega varían según la ciudad y el país del cliente.
        <ul>
          <li>
            <strong>Envío nacional:</strong> El plazo es de uno (5) a siete (7) días para la
            Ciudad de Asunción y hasta diez (10) días para entregas a nivel
            nacional.
          </li>
          <li>
          <strong>Envío internacional:</strong> El plazo máximo de la entrega es de (30) días.
          </li>
        </ul>
        <p>
          Para cumplir con los tiempos de entrega establecidos por
          MARGARETARTSTORE, es necesario que al realizar la compra se
          proporcionen direcciones completas y detalladas. Además, es
          indispensable indicar el número de teléfono celular del cliente para
          posibles contactos por parte de la empresa transportista.
        </p>
      </Box>
    </ShopLayout>
  );
};

export default ShippingPolitiesPage;
