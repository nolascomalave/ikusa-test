export function ssre(string: string):string{
	let chars='\\/-^[]()|\'"`+$?¡¿!*.{}<>';

	for(let i=0; i<chars.length; i++){
		string=string.replace(eval('/\\'+chars.charAt(i)+'/gi'), '\\'+chars.charAt(i));
	}

	return string;
}

export function cleanSpaces(string:string):string{
    return string.replace(/  +/g, ' ').trim();
}