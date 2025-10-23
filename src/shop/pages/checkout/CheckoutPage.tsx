import { useEffect, useState } from 'react';
import { CustomStepper } from '@/components/custom/CustomStepper';
import { AddressStep } from './address/AddressStep';
import { useLocation } from 'react-router';

import { ReviewPaymentStep } from './review-payment/ReviewPaymentStep';

const steps = [{ title: 'Envió' }, { title: 'Revision y Pago' }];

export const CheckoutPage = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    const hash = location.hash.replace('#', '');

    if (hash && (hash === 'shipping' || hash === 'payment')) {
      setCurrentStep(() => (hash === 'shipping' ? 0 : 1));
    } else {
      setCurrentStep(0);
      window.location.hash = '#shipping';
    }
  }, [location.hash]);

  return (
    <section className="py-14">
      <div className="container px-4">
        <div className="flex items-center mb-5">
          <CustomStepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
        {/* Steps */}
        {currentStep === 0 && <AddressStep />}
        {currentStep === 1 && <ReviewPaymentStep />}
      </div>
    </section>
  );
};

export default CheckoutPage;
