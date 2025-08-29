import './styles.css';
import { Container, Dropdown } from '../../components';
import { useGetCountries, useGetStatesDetails } from '../../hooks';
import { useState } from 'react';
export const CountryPage = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<number | null>(null);

  const { data: countries, isLoading } = useGetCountries();
  const { data: states, isLoading: statesLoading } = useGetStatesDetails({ id: Number(selectedCountryId) });

  return (
    <div className='app-wrapper'>
      <Container className='app-container'>
        <Dropdown
          items={
            countries?.map((country) => ({
              id: country.id,
              label: country.value,
            })) ?? []
          }
          onChange={(item) => setSelectedCountryId(Number(item.id))}
          value={Number(selectedCountryId)}
          placeholder='Select a country'
          isLoading={isLoading}
        />

        <Dropdown
          items={
            states?.map((state) => ({
              id: state.id,
              label: state.value,
            })) ?? []
          }
          onChange={(item) => setSelectedState(item.id as number)}
          value={Number(selectedState)}
          placeholder='Search a state'
          isLoading={statesLoading}
        />
      </Container>
    </div>
  );
};
