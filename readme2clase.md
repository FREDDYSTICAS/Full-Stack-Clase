let 

sectx (1);

#evento
-onclik -> clic del usuario
-onChange -> cuando escribe en un input
- onSubmit -> cuando envia un formulario
- onkeyDown -> pulsa una tecla
- onMousenter -> pasa el mouse

<button onclik ="haceralgo()"<>/button>
<button onclik ={haceralgo}<>/button>


- useState -> hook
-Crear una variable de estado
crea una funcion para actualizar algo
le dice a Reac: "cuando cambiar"

const [valoe,setValor]= useState(valorInicial);
const [contador,SetContador] = usestate(0)

- contador -> valor actual
- setContador -> funcion que actualiza
- 0 -> valor inicial