export function swap(array, i, j) {
      let c = array[i];
      array[i] = array[j];
      array[j] = c;
      return array;
  }

  export function insertStep(arrayNew, position, arraySteps) {
	let currentStep = arraySteps[arraySteps.length - 1].slice();
	currentStep.splice(position, arrayNew.length, ...arrayNew);
	arraySteps.push(currentStep);
}