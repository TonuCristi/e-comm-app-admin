import styled from "styled-components";
import { HiMiniXMark } from "react-icons/hi2";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";

import { BuildingWithoutId } from "../../lib/types";

type Props = {
  title: string;
  id?: string;
  onClick: () => void;
  onAdd?: (building: BuildingWithoutId) => void;
  onUpdate?: (id: string, building: BuildingWithoutId) => void;
  building: BuildingWithoutId;
};

const inputsList = [
  {
    type: "text",
    field: "type",
    placeholder: "Type",
    required: true,
    valueAsNumber: false,
  },
  {
    type: "text",
    field: "location",
    placeholder: "Location",
    required: true,
    valueAsNumber: false,
  },
  {
    type: "text",
    field: "address",
    placeholder: "Address",
    required: true,
    valueAsNumber: false,
  },
  {
    type: "number",
    field: "selling_price",
    placeholder: "Selling price",
    required: true,
    valueAsNumber: true,
  },
  {
    type: "number",
    field: "original_price",
    placeholder: "Original price",
    required: true,
    valueAsNumber: true,
  },
  {
    type: "number",
    field: "square_meters",
    placeholder: "Square meters",
    required: true,
    valueAsNumber: true,
  },
  {
    type: "text",
    field: "nr_floors",
    placeholder: "Number of floors",
    required: true,
    valueAsNumber: true,
  },
  {
    type: "number",
    field: "nr_rooms",
    placeholder: "Number of rooms",
    required: true,
    valueAsNumber: true,
  },
  {
    type: "text",
    field: "nr_bathrooms",
    placeholder: "Number of bathrooms",
    required: true,
    valueAsNumber: true,
  },
  {
    type: "number",
    field: "nr_garages",
    placeholder: "Number of garages",
    required: true,
    valueAsNumber: true,
  },
  {
    type: "text",
    field: "nr_balconies",
    placeholder: "Number of balconies",
    required: true,
    valueAsNumber: true,
  },
  {
    type: "number",
    field: "discount_value",
    placeholder: "Discount value",
    required: true,
    valueAsNumber: true,
  },
] as const;

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

const Title = styled.h2`
  text-transform: capitalize;
`;

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

export default function BuildingForm({
  id,
  title,
  onClick,
  onAdd = () => {},
  onUpdate = () => {},
  building,
}: Props) {
  const {
    type,
    location,
    address,
    selling_price,
    original_price,
    square_meters,
    nr_floors,
    nr_rooms,
    nr_bathrooms,
    nr_garages,
    nr_balconies,
    discount_value,
    description,
  } = building;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      type: title === "update" ? type : "",
      location: title === "update" ? location : "",
      address: title === "update" ? address : "",
      selling_price: title === "update" ? selling_price : "",
      original_price: title === "update" ? original_price : "",
      square_meters: title === "update" ? square_meters : "",
      nr_floors: title === "update" ? nr_floors : "",
      nr_rooms: title === "update" ? nr_rooms : "",
      nr_bathrooms: title === "update" ? nr_bathrooms : "",
      nr_garages: title === "update" ? nr_garages : "",
      nr_balconies: title === "update" ? nr_balconies : "",
      discount_value: title === "update" ? discount_value : "",
      description: title === "update" ? description : "",
    },
  });
  const onSubmit: SubmitHandler<BuildingWithoutId> = (data) => {
    const { selling_price, original_price, square_meters, nr_floors } = data;

    if (
      selling_price === 0 ||
      original_price === 0 ||
      square_meters === 0 ||
      nr_floors === 0
    )
      return;

    if (id) {
      onUpdate(id, data);
      onClick();
      return;
    }
    onAdd(data);
    onClick();
  };

  return (
    <Overlay>
      <ButtonWrapper>
        <Button onClick={onClick} variant="operation">
          <CloseIcon />
        </Button>
      </ButtonWrapper>

      <Wrapper>
        <Title>{title} building</Title>
        <StyledAddBuildingForm onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            {inputsList.map(
              ({ type, field, placeholder, required, valueAsNumber }) => (
                <Input
                  key={field}
                  type={type}
                  placeholder={placeholder}
                  {...register(field, {
                    required: required,
                    valueAsNumber: valueAsNumber,
                  })}
                />
              )
            )}
          </Inputs>
          <Textarea
            placeholder="Description"
            rows={5}
            {...register("description", { required: true })}
          />
          <Button variant="regular">{title} building</Button>
        </StyledAddBuildingForm>
      </Wrapper>
    </Overlay>
  );
}
