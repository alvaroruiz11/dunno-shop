import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { Separator } from '@/components/ui/separator';

export const TermsConditionsPage = () => {
  return (
    <>
      <CustomJumbotron title="Términos y Condiciones" />
      <section className="pt-6 pb-28">
        <div className="container px-4">
          <p className="text-sm text-muted-foreground mb-10">
            <span className="font-semibold">Última actualización:</span> 22 de
            Octubre de 2025
          </p>

          <Separator />

          <h2 className="text-2xl font-bold mb-4 mt-6">
            1. Aceptación de los Términos
          </h2>
          <p className="mb-4">
            Al acceder y utilizar este sitio web, usted acepta estar sujeto a
            estos Términos y Condiciones, a nuestra Política de Privacidad y a
            todas las leyes y regulaciones aplicables. Si no está de acuerdo con
            alguna parte de estos términos, le solicitamos que no utilice
            nuestro sitio.
          </p>
          <p className="mb-6">
            El uso de nuestros servicios implica la lectura, comprensión y
            aceptación de la totalidad de las cláusulas detalladas a
            continuación.
          </p>

          <h2 className="text-2xl font-bold mb-4 pt-4">
            2. Cuentas de Usuario
          </h2>
          <p className="mb-4">
            Para realizar compras y acceder a ciertas funcionalidades, deberá
            crear una cuenta. Usted es responsable de mantener la
            confidencialidad de su contraseña y de restringir el acceso a su
            cuenta. Acepta asumir la responsabilidad de todas las actividades
            que ocurran bajo su cuenta o contraseña.
          </p>
          <p className="mb-6">
            <span className="font-bold text-destructive">
              Veracidad de la Información:
            </span>{' '}
            Usted se compromete a proporcionar información actual, completa y
            precisa durante el proceso de registro y de compra. El
            incumplimiento de esta obligación constituye una violación grave de
            estos Términos.
          </p>

          <h2 className="text-2xl font-bold mb-4 pt-4">
            3. Precios, Pedidos y Pagos
          </h2>
          <p className="mb-4">
            Todos los precios mostrados en el sitio web están en la moneda local
            e incluyen los impuestos aplicables (IVA o similar), salvo que se
            indique explícitamente lo contrario.
          </p>
          <p className="mb-4">
            <span className="font-semibold">Proceso de Pago:</span> El
            procesamiento de pagos es manejado por plataformas de terceros
            (pasarelas de pago). No almacenamos información sensible de tarjetas
            de crédito o débito.
          </p>
          <p className="mb-6">
            Nos reservamos el derecho de rechazar o cancelar cualquier pedido
            por razones que incluyen, pero no se limitan a: disponibilidad de
            stock, errores en la descripción o el precio del producto, o errores
            en su pedido.
          </p>

          <h2 className="text-2xl font-bold mb-4 pt-4">
            4. Limitación de Responsabilidad
          </h2>
          <p className="text-700 mb-6">
            El sitio web y todos sus contenidos se proporcionan "tal cual" y
            "según disponibilidad". En ningún caso la empresa será responsable
            por daños directos, indirectos, incidentales o consecuentes que
            resulten del uso o la imposibilidad de usar los servicios.
          </p>

          <h2 className="text-2xl font-bold mb-4 pt-4">5. Ley Aplicable</h2>
          <p className="text-700">
            Estos Términos se regirán e interpretarán de acuerdo con las leyes
            del Estado Plurinacional de Bolivia, sin dar efecto a ningún
            principio de conflicto de leyes.
          </p>
        </div>
      </section>
    </>
  );
};

export default TermsConditionsPage;
