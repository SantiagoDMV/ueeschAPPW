import { useMemo, ReactNode, useCallback } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';

const joyrideStyles = {
  options: {
    zIndex: 10000,
  },
};

export default function UseTour(
  steps: Step[],
  localStoreKey: string | null
): ReactNode {
  const handleJoyrideCallback = useCallback(function (data: CallBackProps) {
    const { status } = data;
    const finishedStatus: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    // Puedes agregar acciones adicionales según el estado del recorrido (tour)
    // Por ejemplo, puedes guardar en el almacenamiento local si el usuario ha completado el tour.

    if (finishedStatus.includes(status)) {
      // Acciones cuando el tour está completo o se omite
      // Por ejemplo, guardar en el almacenamiento local
      if (localStoreKey) {
        localStorage.setItem(localStoreKey, 'true');
      }
    }
  }, [localStoreKey]);

  return useMemo(() => {
    return (
      <Joyride
        callback={handleJoyrideCallback}
        run={true}
        scrollToFirstStep={true}
        steps={steps}
        showProgress={true}
        showSkipButton={true}
        styles={joyrideStyles}
      />
    );
  }, [handleJoyrideCallback, steps]);
}
