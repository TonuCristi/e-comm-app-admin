import styled from "styled-components";
import { HiMiniXMark } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";

type Props = {
  onClick: () => void;
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const Title = styled.h2``;

const StyledAddBuildingForm = styled.form`
  border: 3px solid var(--color-indigo-50);
  background-color: var(--color-indigo-900);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 2.4rem;
  border-radius: 1.7rem;
`;

const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.8rem;
  background: none;
  border: 3px solid var(--color-indigo-50);
  outline: none;
  color: var(--color-indigo-50);
  border-radius: 0.7rem;

  &::placeholder {
    color: var(--color-indigo-50);
    opacity: 0.5;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 500;
  padding: 0.8rem;
  background: none;
  border: 3px solid var(--color-indigo-50);
  outline: none;
  color: var(--color-indigo-50);
  border-radius: 0.7rem;
  margin-bottom: 1.2rem;

  &::placeholder {
    color: var(--color-indigo-50);
    opacity: 0.5;
  }
`;

const CloseIcon = styled(HiMiniXMark)`
  font-size: 2.4rem;
  stroke-width: 1;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

export default function AddBuildingForm({ onClick }: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      type: "",
      location: "",
      address: "",
      selling_price: "",
      original_price: "",
      square_meters: "",
      nr_floors: "",
      nr_rooms: "",
      nr_bathrooms: "",
      nr_garages: "",
      nr_balconies: "",
      discount_value: "",
      description: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { selling_price, original_price, square_meters, nr_floors } = data;

    if (
      selling_price === 0 ||
      original_price === 0 ||
      square_meters === 0 ||
      nr_floors === 0
    )
      return;

    console.log(data);
  };

  return (
    <Overlay>
      <ButtonWrapper>
        <Button onClick={onClick} variant="operation">
          <CloseIcon />
        </Button>
      </ButtonWrapper>
      <Wrapper>
        <Title>Add building</Title>
        <StyledAddBuildingForm onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            <Input
              placeholder="Type"
              {...register("type", { required: true })}
            />
            <Input
              placeholder="Location"
              {...register("location", { required: true })}
            />
            <Input
              placeholder="Address"
              {...register("address", { required: true })}
            />
            <Input
              placeholder="Selling price"
              {...register("selling_price", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <Input
              placeholder="Original price"
              {...register("original_price", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <Input
              placeholder="Square meters"
              {...register("square_meters", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <Input
              placeholder="Number of floors"
              {...register("nr_floors", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <Input
              placeholder="Number of rooms"
              {...register("nr_rooms", { required: true, valueAsNumber: true })}
            />
            <Input
              placeholder="Number of bathrooms"
              {...register("nr_bathrooms", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <Input
              placeholder="Number of garages"
              {...register("nr_garages", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <Input
              placeholder="Number of balconies"
              {...register("nr_balconies", {
                required: true,
                valueAsNumber: true,
              })}
            />
            <Input
              placeholder="Discount value"
              {...register("discount_value", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </Inputs>
          <Textarea
            placeholder="Description"
            rows={5}
            {...register("description", { required: true })}
          />
          <Button variant="regular">Add building</Button>
        </StyledAddBuildingForm>
      </Wrapper>
    </Overlay>
  );
}
