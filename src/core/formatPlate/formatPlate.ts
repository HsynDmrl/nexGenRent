// Plaka formatını düzenlemek için bir yardımcı fonksiyon
export const formatPlate = (value: string) => {
	const upperValue = value.toUpperCase();
	// Sayı ve harfleri ayırmak için regex kullan
	const parts = upperValue.match(/[A-Z]+|\d+/g);
  
	if (parts) {
	  // İlk bölüm sayısal ve ikinci bölüm harf ise (örn. 34ABC1234)
	  if (parts.length === 3 && !isNaN(parseInt(parts[0], 10)) && isNaN(parseInt(parts[1], 10))) {
		// "34 ABC 1234" formatına çevir
		return `${parts[0]} ${parts[1]} ${parts[2]}`;
	  } else if (parts.length === 2) {
		// Eğer sadece iki bölüm varsa, bu "34ABC" veya "34 1234" olabilir
		if (!isNaN(parseInt(parts[0], 10))) { // Eğer ilk bölüm sayısal ise
		  // "34 ABC" formatına çevir
		  return `${parts[0]} ${parts[1]}`;
		} else {
		  // "ABC 123" formatına çevir
		  return `${parts[0]} ${parts[1]}`;
		}
	  }
	}
  
	// Eğer yukarıdaki koşullara uymuyorsa, kullanıcı girişini olduğu gibi döndür
	return value.toUpperCase();
  };
  