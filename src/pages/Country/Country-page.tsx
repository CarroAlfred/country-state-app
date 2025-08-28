import './styles.css';
import { Container, Autocomplete, Dropdown } from '../../components';
import { useGetCountries, useGetStatesDetails } from '../../hooks';
import { useState } from 'react';
export const CountryPage = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);
  const { data: countries, isLoading, error } = useGetCountries();

  const { data: states = [], isLoading: statesLoading } = useGetStatesDetails({ id: selectedCountryId ?? 0 });

  const handleCountrySelect = (country: { id: number; value: string }) => {
    setSelectedCountryId(country.id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load countries</p>;

  // todo styling and add loading state component
  // we can also add layout but not needed
  // do not refetch states if country is not selected
  return (
    <div className='app-wrapper'>
      <Container className='app-container'>
        <Autocomplete
          items={countries || []}
          displayKey='value'
          onSelect={handleCountrySelect}
          placeholder='Search a country'
        />
        <Dropdown
          items={states.map((state) => ({ id: state.id, label: state.value, value: state.value }))}
          placeholder='Select state'
          onChange={(item) => {
            setSelectedState(item.value);
          }}
          disabled={!selectedCountryId || statesLoading}
          value={selectedState}
        />
      </Container>
    </div>
  );
};
