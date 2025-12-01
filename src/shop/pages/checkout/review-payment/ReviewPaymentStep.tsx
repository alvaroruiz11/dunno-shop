import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAddressStore } from '@/store/address/address-store';
import { PlaceOrder } from './ui/PlaceOrder';
import { useCartStore } from '@/store/cart/cart-store';
import { placeOrderAction } from '@/orders/actions/place-order.action';
import { cn } from '@/lib/utils';

interface FormInputs {
  documentType: string;
  nitNumber: string;
  socialReason: string;
}

export const ReviewPaymentStep = () => {
  const navigate = useNavigate();
  const address = useAddressStore((state) => state.address);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const cleanCart = useCartStore((state) => state.clearCart);

  const {
    register,
    trigger,
    watch,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>();

  const placeOrder = async () => {
    const valid = await trigger();

    if (!valid) return;

    setIsPlacingOrder(true);

    const productsToOrder = cart.map((item) => ({
      productVariantId: item.productVariantId,
      quantity: item.quantity,
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { departmentId, provinceId, ...addressToOrder } = address;

    const documentType = getValues('documentType');
    const nitNumber = getValues('nitNumber');
    const socialReason = getValues('socialReason');

    const orderInvoice =
      documentType === 'NIT'
        ? {
            documentType: documentType,
            nitNumber: nitNumber,
            socialReason: socialReason,
          }
        : {
            documentType: documentType,
            nitNumber: address.ci,
            socialReason: `${address.firstName} ${address.lastName}`,
          };

    const resp = await placeOrderAction(
      productsToOrder,
      addressToOrder,
      orderInvoice
    );

    if (!resp.ok) {
      setIsPlacingOrder(false);
      toast.error('Error en crear orden', { position: 'top-center' });
      return;
    }
    //* Todo salio bien
    cleanCart();
    navigate(`/orden/${resp.order!.id}`);
    toast.success('Orden creada, proceda con el pago', {
      position: 'top-center',
    });
  };

  const documentType = watch('documentType');

  const onPrev = () => {
    window.location.hash = '#shipping';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <FieldGroup>
        <FieldSet>
          <h2 className="text-2xl font-semibold font-din-next">
            Revision y Pago
          </h2>
          <FieldGroup>
            <Card className="bg-muted/40 shadow-none">
              <CardHeader>
                <CardTitle>
                  <span className="font-din-next text-lg">Enviar a</span>
                </CardTitle>
                <CardAction>
                  <Button onClick={onPrev} variant="link">
                    Editar
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1.5">
                  <p>
                    {address.firstName} {address.lastName}
                  </p>
                  <p>
                    Celular: <span>{address.phone}</span>
                  </p>
                  <p>
                    Dirección: <span>{address.phone}</span>
                  </p>
                  {/* Seleccion Departamento, Provicia y Ciudad */}
                  <p>TARIJA, CERCADO, TARIJA</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/40 shadow-none">
              <CardHeader>
                <CardTitle>
                  <span className="font-din-next text-lg">Método de envió</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p>
                    Envió gratis - Tu pedido llegará en 1 a 2 días hábiles en
                    Tarija (ciudad). De 3 a 5 días hábiles para Cochabamba,
                    Santa Cruz y La Paz (ciudad). De 5 a 7 días hábiles para el
                    resto del país - Gracias.
                  </p>
                </div>
              </CardContent>
            </Card>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="document-type">
                <span className="font-din-next text-lg font-semibold">
                  Comprobante
                </span>
              </FieldLabel>
              <NativeSelect
                id="document-type"
                {...register('documentType', { required: true })}
                defaultValue="ci"
              >
                <NativeSelectOption disabled value="">
                  Seleccionar comprobante
                </NativeSelectOption>
                <NativeSelectOption value="CI">CI</NativeSelectOption>
                <NativeSelectOption value="NIT">NIT</NativeSelectOption>
              </NativeSelect>
            </Field>
            {documentType === 'NIT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="nit">Numero de NIT</FieldLabel>
                  <Input
                    {...register('nitNumber', { required: true })}
                    id="nit"
                    placeholder="Numero de NIT"
                    className={cn({ 'border-destructive': errors.nitNumber })}
                  />
                  {errors.nitNumber && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="social-reason">Razón Social</FieldLabel>
                  <Input
                    {...register('socialReason', { required: true })}
                    id="social-reason"
                    placeholder="Razón social"
                    className={cn({
                      'border-destructive': errors.socialReason,
                    })}
                  />
                  {errors.socialReason && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
              </div>
            )}
          </FieldGroup>
          <FieldGroup>
            <h2 className="text-lg font-semibold font-din-next">
              Método de pago
            </h2>
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>
                  <RadioGroup defaultValue="check">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="check" />
                      <span className="font-din-next">
                        Tarjeta de Crédito/ Débito / QR Simple / Pago en
                        Efectivo / Billetera Móvil
                      </span>
                    </div>
                  </RadioGroup>
                </CardTitle>
              </CardHeader>
            </Card>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <div>
        <PlaceOrder
          isPlacingOrder={isPlacingOrder}
          setIsPlacingOrder={setIsPlacingOrder}
          onPlaceOrder={placeOrder}
        />
      </div>
    </div>
  );
};
