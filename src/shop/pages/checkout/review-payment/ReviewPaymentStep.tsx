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
import { useForm } from 'react-hook-form';

interface FormInputs {
  documentType: string;
  nitNumber: string;
  socialReason: string;
}

export const ReviewPaymentStep = () => {
  const address = useAddressStore((state) => state.address);

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

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
                <NativeSelectOption value="ci">CI</NativeSelectOption>
                <NativeSelectOption value="nit">NIT</NativeSelectOption>
              </NativeSelect>
            </Field>
            {documentType === 'nit' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="nit">Numero de NIT</FieldLabel>
                  <Input
                    {...register('nitNumber', { required: true })}
                    id="nit"
                    placeholder="Numero de NIT"
                  />
                  {errors.nitNumber && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel
                    {...register('socialReason', { required: true })}
                    htmlFor="social-reason"
                  >
                    Razón Social
                  </FieldLabel>
                  <Input id="social-reason" placeholder="Razón social" />
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
        <PlaceOrder />
      </div>
    </div>
  );
};
