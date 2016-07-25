export default function(){
  this.transition(
    this.toRoute('index'),
    this.toRoute('places.place'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
};
