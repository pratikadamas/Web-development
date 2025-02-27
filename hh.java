
interface AREA{
    void area();
}

class circle implements AREA {
   public void area() {
         System.out.println("Circle.area");
    }

}

class rectangle implements AREA {
    public void area() {
         System.out.println("Rectangle.area");
    }
}
class square implements AREA {
    public void area() {
         System.out.println("Square.area");
    }
}

  class  hh {
    public static void main(String[] args) {
         circle c = new circle();
         rectangle r = new rectangle();
         square s = new square();
         s.area();
         c.area();
         r.area();
    }

}
