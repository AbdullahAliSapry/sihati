import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import styles from "./SliderToCart.module.css";
import  { useEffect } from "react";
import CardCom from "../../pages/Specialtiespage/components/cardcom/CardCom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/Store";
import { useParams } from "react-router-dom";
import { getAllDoctorsToSpecialist } from "../../store/api/SpecialtieApi";
const { swiperProduct } = styles;

export default function SliderToCart() {
  const dispatch = useDispatch<AppDispatch>();
  const { nameSpecialized } = useParams();

  const {SpecialistsToDepartment}=useSelector((state:RootState)=>state.Specialists)
  useEffect(() => {
    if (nameSpecialized == undefined) return;
    dispatch(getAllDoctorsToSpecialist(nameSpecialized));
  }, []);
  return (
    <div className="my-5">
      <div className={swiperProduct}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          loop={true}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
          }}>
          {SpecialistsToDepartment?.data.doctors.map((doctor, index) => {
            console.log(doctor);          
            return (
              <SwiperSlide key={`prod-list-${index}`}>
                <CardCom Doctor={doctor} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
