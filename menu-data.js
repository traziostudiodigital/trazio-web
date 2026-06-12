const multiNicheData = {
  comida: [
    {
      id: "food-01",
      name: { es: "Café Espresso", en: "Espresso Coffee" },
      desc: {
        es: "Café cubano fuerte, recién colado, con espuma dorada tradicional.",
        en: "Strong Cuban coffee, freshly brewed, with traditional golden foam."
      },
      price: 1.50,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400"
    },
    {
      id: "food-02",
      name: { es: "Cortadito Habana", en: "Cortadito Habana" },
      desc: {
        es: "Espresso corto cortado con leche condensada y un toque de leche vaporizada.",
        en: "Short espresso cut with condensed milk and a touch of steamed milk."
      },
      price: 2.00,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400"
    }
  ],
  ropa: [
    {
      id: "cloth-01",
      name: { es: "Zapatillas Deportivas Urbanas", en: "Urban Sneakers" },
      desc: {
        es: "Calzado de alta durabilidad, diseño deportivo moderno ideal para uso diario.",
        en: "High-durability footwear, modern athletic design perfect for daily wear."
      },
      price: 45.00,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      sizes: ["S", "M", "L"]
    },
    {
      id: "cloth-02",
      name: { es: "Vestido Casual de Verano", en: "Casual Summer Dress" },
      desc: {
        es: "Tejido fresco, corte ligero y cómodo, última tendencia importada.",
        en: "Cool fabric, light and comfortable cut, latest imported trend."
      },
      price: 25.00,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      sizes: ["S", "M", "L"]
    }
  ],
  servicios: [
    {
      id: "serv-01",
      name: { es: "Mantenimiento Preventivo de Split", en: "Split AC Preventive Maintenance" },
      desc: {
        es: "Limpieza profunda de turbina, evaporador, filtros y medición de refrigerante.",
        en: "Deep cleaning of turbine, evaporator, filters, and refrigerant pressure check."
      },
      price: 20.00,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400"
    },
    {
      id: "serv-02",
      name: { es: "Instalación de Paneles Solares", en: "Solar Panel Installation" },
      desc: {
        es: "Estudio de carga del hogar, montaje de estructura y conexión de respaldo fotovoltaico.",
        en: "Household load study, mounting of structure, and photovoltaic backup system connection."
      },
      price: 150.00,
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400"
    }
  ]
};

window.multiNicheData = multiNicheData;