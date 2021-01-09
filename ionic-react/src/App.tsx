import React, { useRef, useState } from 'react';
import {
	IonApp,
	IonHeader,
	IonContent,
	IonToolbar,
	IonTitle,
	IonGrid,
	IonRow,
	IonCol,
	IonItem,
	IonLabel,
	IonInput,
} from '@ionic/react';

import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
	const [calculatedBmi, setCalculatedBmi] = useState<number>();
	const heightInputRef = useRef<HTMLIonInputElement>(null);
	const weightInputRef = useRef<HTMLIonInputElement>(null);

	const calculateBMI = () => {
		const enteredHeight = heightInputRef.current?.value;
		const enteredWeight = weightInputRef.current!.value;

		if (!enteredHeight || !enteredWeight) {
			return;
		}

		const bmi = +enteredWeight / (+enteredHeight * +enteredHeight);
		setCalculatedBmi(bmi);
	};
	const resetInputs = () => {
		heightInputRef.current!.value = '';
		weightInputRef.current!.value = '';
		setCalculatedBmi(undefined);
	};
	return (
		<IonApp>
			<IonHeader>
				<IonToolbar>
					<IonTitle>BMI Calculator </IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonItem>
								<IonLabel position="floating">Your Height</IonLabel>
								<IonInput ref={heightInputRef}></IonInput>
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonItem>
								<IonLabel position="floating">Your Weight</IonLabel>
								<IonInput ref={weightInputRef}></IonInput>
							</IonItem>
						</IonCol>
					</IonRow>

					<BmiControls onCalculate={calculateBMI} onReset={resetInputs} />

					{calculatedBmi && <BmiResult result={calculatedBmi} />}
				</IonGrid>
			</IonContent>
		</IonApp>
	);
};

export default App;
