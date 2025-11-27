import hero1 from "@/public/images/hero1.jpg"
import hero2 from "@/public/images/hero2.jpg"
import hero3 from "@/public/images/hero3.jpg"
import hero4 from "@/public/images/hero4.jpg"
import {Carousel,CarouselNext,CarouselPrevious,CarouselItem,CarouselContent} from "@/components/ui/carousel";
import {Card,CardContent} from "@/components/ui/card";
import Image from "next/image";
const HeroCarousel = () => {
    const images = [hero1,hero2,hero3,hero4];
    return (
        <div className="hidden lg:block">
            <Carousel>
                <CarouselContent>
                    {images.map((image,index)=> {
                        return (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent className="p-3">
                                        <Image src={image} alt="logo" className="rounded-md w-full h-[24rem] object-cover"/>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}
export default HeroCarousel