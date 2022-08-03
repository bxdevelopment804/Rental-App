import { createContext, useState } from 'react';

export const currentStepContext = createContext();

const CurrentStepProvider = (props) => {
	const [currentStep, setCurrentStep] = useState(0);

	return (
		<currentStepContext.Provider value={[currentStep, setCurrentStep]}>
			{props.children}
		</currentStepContext.Provider>
	);
};

export default CurrentStepProvider;
