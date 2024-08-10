export class errorApp  extends Error{
constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode
}
}