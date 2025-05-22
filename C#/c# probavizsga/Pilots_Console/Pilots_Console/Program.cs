// See https://aka.ms/new-console-template for more information

using Pilots_Console;

List<Pilot>? pilots = Pilot.LoadFromJSON("pilots.json");
Console.Write("5.feladat: Adja meg egy név részletét: ");
string? input = Console.ReadLine();
Keres(pilots, input);
FileWrite(pilots);

static void FileWrite(List<Pilot> pilots)
{
	try
	{
        StreamWriter sw = new StreamWriter("pilot_groups.txt");
        List<string> countries = pilots.Select(x => x.nation).Distinct().Order().ToList();
        foreach (var c in countries)
        {
            List<Pilot> nationPilots = pilots.Where(x => x.nation == c).ToList();
            sw.WriteLine($"{c} ({nationPilots.Count}) fő:");
            foreach (var n in nationPilots)
            {
                sw.WriteLine($"\t{n.name} - {n.birthdate}");
            }
        }
        sw.Close();
        Console.WriteLine("6.feladat: pilot_groups.txt sikeresen megírva!");
    }
	catch (Exception)
	{
        Console.WriteLine("Hiba! Fájl írása sikertelen!");
	}
	
}

static void Keres(List<Pilot>? pilots, string? input)
{
    bool ok = false;
	foreach (var p in pilots)
	{
		string[] nameSlices = p.name.Split();
		if (nameSlices[0].ToLower().StartsWith(input.ToLower()) || nameSlices[1].ToLower().StartsWith(input.ToLower()))
		{
            ok = true;
            Console.WriteLine($"\t{p.id}\t{p.name}\t{p.birthdate}\t{p.gender}\t{p.nation}");
		}
	}
    if(!ok)
        Console.WriteLine($"\tNem található pilóta {input} névrészlettel!");
}
