import styled from "styled-components";
import { HiMiniXMark } from "react-icons/hi2";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";

import { BuildingRequest, BuildingWithoutId } from "../../lib/types";

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
    field: "area",
    placeholder: "Area",
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
  height: 100vh;
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

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

type Props = {
  title: string;
  id?: string;
  onClick: () => void;
  onAdd?: (building: BuildingRequest) => void;
  onUpdate?: (id: string, building: BuildingRequest) => void;
  defaultValues?: BuildingWithoutId;
};

export default function BuildingForm({
  id,
  title,
  onClick,
  onAdd = () => {},
  onUpdate = () => {},
  defaultValues,
}: Props) {
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValues,
  });

  const mapBuildingRequest = (building: BuildingWithoutId) => {
    return {
      type: building.type,
      location: building.location,
      address: building.address,
      selling_price: building.selling_price,
      discount_value: building.discount_value,
      nr_balconies: building.nr_balconies,
      nr_bathrooms: building.nr_bathrooms,
      nr_floors: building.nr_floors,
      nr_garages: building.nr_garages,
      nr_rooms: building.nr_rooms,
      original_price: building.original_price,
      square_meters: building.area,
      description: building.description,
      available: building.available,
      createdAt: building.createdAt,
      updatedAt: building.updatedAt,
    };
  };

  const onSubmit: SubmitHandler<BuildingWithoutId> = (data) => {
    const { selling_price, original_price, area, nr_floors } = data;

    if (
      selling_price === 0 ||
      original_price === 0 ||
      area === 0 ||
      nr_floors === 0
    )
      return;

    if (id) {
      onUpdate(id, mapBuildingRequest(data));
      onClick();
      return;
    }
    onAdd(mapBuildingRequest(data));
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
          <CheckBoxWrapper>
            <input type="checkbox" {...register("available")} />
            <label>Availability</label>
          </CheckBoxWrapper>
          <Button variant="regular">{title} building</Button>
        </StyledAddBuildingForm>
      </Wrapper>
    </Overlay>
  );
}
