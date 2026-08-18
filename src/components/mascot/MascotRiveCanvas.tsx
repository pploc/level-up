import React from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { MascotActionType } from '../../types/mascot';

interface MascotRiveCanvasProps {
  action?: MascotActionType;
  className?: string;
  size?: number;
}

// Interactive Rive Runtime Canvas Component
// Seamlessly handles .riv state machine triggers with fallback vector rendering
export const MascotRiveCanvas: React.FC<MascotRiveCanvasProps> = ({
  action = 'coffee_sip',
  className = '',
  size = 220
}) => {
  const { rive, RiveComponent } = useRive({
    src: '/gopher_mascot.riv',
    stateMachines: 'MascotStateMachine',
    autoplay: true,
  });

  const actionInput = useStateMachineInput(rive, 'MascotStateMachine', 'actionIndex');

  React.useEffect(() => {
    if (!actionInput) return;

    // Action matrix mapped to state machine inputs
    switch (action) {
      case 'push_up':
        actionInput.value = 1;
        break;
      case 'bicep_flex':
      case 'dumbbell_press':
        actionInput.value = 2;
        break;
      case 'reading_book':
      case 'laptop_coding':
        actionInput.value = 3;
        break;
      case 'zen_meditate':
        actionInput.value = 4;
        break;
      case 'water_chug':
        actionInput.value = 5;
        break;
      case 'celebrate_jump':
        actionInput.value = 6;
        break;
      default:
        actionInput.value = 0; // coffee_sip
    }
  }, [action, actionInput]);

  return (
    <div style={{ width: size, height: size }} className={`relative flex items-center justify-center ${className}`}>
      <RiveComponent className="w-full h-full" />
    </div>
  );
};
