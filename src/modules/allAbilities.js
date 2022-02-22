export const allAbilities = [
    {
        ID: 31,
        Name: "Heavy Swing",
        potency: 200,
        gcd: 1
    },
    {
        ID: 37,
        Name: "Maim",
        comboAction: "Heavy Swing",
        potency: 130,
        comboPotency: 280,
        gauge: 10,
        gcd: 1
    },
    {
        ID: 42,
        Name: "Storm's Path",
        comboAction: "Maim",
        potency: 120,
        comboPotency: 400,
        gauge: 20,
        gcd: 1
    },
    {
        ID: 45,
        Name: "Storm's Eye",
        comboAction: "Maim",
        potency: 120,
        comboPotency: 400,
        gauge: 10,
        buff: "Surging Tempest",
        gcd: 1
    }
    ];