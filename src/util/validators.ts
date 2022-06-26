type None<Type> = null | undefined | Type;

// Esta función valida un texto, es decir, si es requerido, la longitud mínima y la máxima:
export function validateSimpleText(string: any, name: string, min: None<number>, max: None<number>, required?: None<boolean>): null | string{
	if(!string && !required) return null;
	if(!string) return 'The '+name+' is required!';
	if(typeof string!='string' && typeof string!='number') return 'The '+name+' must be defined in text or numeric format!';

    if(!min || min<1) min = 1;

	if(!max){
		if(min-250<750) max=1000-min;
		else max = min+250;
	}else{
		if(max<min) max=min+250;
	}

	string=string.toString().trim();
	if(string.length<1) return 'The '+name+' is required!';
	if(string.length<min) return 'The '+name+' must contain at least '+min+' characters!';
	if(string.length>max) return 'The '+name+' must contain a maximum of '+max+' characters!';

	return null;
}

type ValidateCuantity = {
    num: any;
    name: string;
    min?: None<number>;
    max?: None<number>;
    int: None<boolean>;
    required?: None<boolean>;
}

// Esta función valida un número, el valor mínimo y el máximo del mismo, y si es requerido o no.
export function validateCuantity({num, name, min, max, int, required} : ValidateCuantity): null | string{
	if((!num && num!=='0' && num!==0) && !required) return null;
	if(!name) name='quantity';
	if(!num && num!=='0' && num!==0) return `The ${name} is required!`;

	let type=typeof num;
	if(type!=='string' && type!=='number') return `The ${name} must be defined in text or number format!`;
	if(type==='string' && isNaN(num)) return `The ${name} is not a number!`;
	num=Number(num);

	if(int && !Number.isInteger(num)) return `The ${name} must be an integer!`;

	if(!min){
		min=0;
	}else{
		let valid=validateCuantity({num:min, name:'minimum quantity', int});
		if(valid) return valid;
	}

	if(!!max){
		let valid=validateCuantity({num:max, name:'maximum quantity', min, int});
		if(valid) return valid;
	}

	if(num<min) return `The ${name} must not be less than ${min}!`;

	if(!!max && num>max) return `The ${name} must not be greater than ${max}!`;

	return null;
}