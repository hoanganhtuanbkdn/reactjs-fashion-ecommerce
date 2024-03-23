export const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ');
};

export const insertIf = (condition, ...elements) => {
	return condition ? [...elements] : [];
};

export const insertObjectIf = (condition, elements1, elements2) => {
	return condition ? elements1 : elements2 || {};
};
export const insertObjectIfV2 = (condition, elements1) => {
	return condition ? elements1 : {};
};
