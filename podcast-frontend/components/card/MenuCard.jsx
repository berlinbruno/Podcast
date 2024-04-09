import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

const MenuCard = ({ link, title, image }) => {
  return (
    <Link href={link}>
      <Card className=" hover:scale-105 transition-all ease-in-out rounded-lg hover:hue-rotate-15 h-full">
        <CardHeader className="items-center w-full">
          <AspectRatio ratio={1 / 1}>
            <Image
              className=" rounded-md object-cover bg-muted"
              src={image}
              alt={title}
              fill
              priority
            />
          </AspectRatio>
        </CardHeader>
        <CardContent>
          <CardTitle className=" text-center">{title}</CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
