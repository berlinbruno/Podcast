import EditPinCard from "../card/EditPinCard";

const EditPinList = ({ podcasts, userId }) => {
  return (
    <article className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2">
      {podcasts?.map((podcast, index) => {
        return <EditPinCard podcast={podcast} userId={userId} key={index} />;
      })}
    </article>
  );
};

export default EditPinList;
