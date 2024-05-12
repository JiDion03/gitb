import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.less";
const Navbar = () => {
  return (
    <nav className="menu">
    <ol>
    <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}`}>Laptop, Tablete, Telefoane</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Laptopuri')}`}>Laptopuri</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Accesorii laptop')}`}>Accesorii laptop</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Telefoane mobile')}`}>Telefoane mobile</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Accesorii telefoane mobile')}`}>Accesorii telefoane mobile</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Tablete')}`}>Tablete</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Accesorii tablete')}`}>Accesorii tablete</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Laptop, Tablete, Telefoane')}&subcategory=${encodeURIComponent('Wearables si Gadgets')}`}>Wearables si Gadgets</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('PC & Software')}`}>PC & Software</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Desktop PC')}`}>Desktop PC</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Monitoare')}`}>Monitoare</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Placi Video')}`}>Placi Video</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Placi de baza')}`}>Placi de baza</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Procesoare')}`}>Procesoare</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Solid-State-Drive (SSD)')}`}>Solid-State-Drive (SSD)</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Hard Disk-uri')}`}>Hard Disk-uri</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Memorii')}`}>Memorii</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Carcase')}`}>Carcase</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Coolere procesor')}`}>Coolere procesor</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Placi de sunet')}`}>Placi de sunet</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Surse PC')}`}>Surse PC</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Sisteme de operare')}`}>Sisteme de operare</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('PC & Software')}&subcategory=${encodeURIComponent('Office & Aplicatii desktop')}`}>Office & Aplicatii desktop</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Periferice PC')}`}>Periferice PC</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Mouse')}`}>Mouse</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Tastaturi')}`}>Tastaturi</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Hard Disk externe')}`}>Hard Disk externe</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('SSD-uri externe')}`}>SSD-uri externe</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Boxe PC')}`}>Boxe PC</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Casti')}`}>Casti</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Microfoane')}`}>Microfoane</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Memorii USB')}`}>Memorii USB</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Imprimante')}`}>Imprimante</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Cartuse, tonere si consumabile')}`}>Cartuse, tonere si consumabile</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Routere wireless')}`}>Routere wireless</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Camere de supraveghere')}`}>Camere de supraveghere</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Periferice PC')}&subcategory=${encodeURIComponent('Camere Web')}`}>Camere Web</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}`}>TV, Sisteme Audio-Video</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Televizoare si accesorii')}`}>Televizoare si accesorii</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Drone si accesorii')}`}>Drone si accesorii</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Camere video si accesorii')}`}>Camere video si accesorii</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Aparate foto si accesorii')}`}>Aparate foto si accesorii</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('TV, Sisteme Audio-Video')}&subcategory=${encodeURIComponent('Videoproiectoare si accesorii')}`}>Videoproiectoare si accesorii</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}`}>Electrocasnice, Climatizare</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Frigidere si derivate')}`}>Frigidere si derivate</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Masini de spalat rufe')}`}>Masini de spalat rufe</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Aragazuri, hote si cuptoare')}`}>Aragazuri, hote si cuptoare</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Masini de spalat vase')}`}>Masini de spalat vase</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Electrocasnice bucatarie')}`}>Electrocasnice bucatarie</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Espressoare si cafetiere')}`}>Espressoare si cafetiere</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Aspiratoare si fiare de calcat')}`}>Aspiratoare si fiare de calcat</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Climatizare')}`}>Climatizare</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Purificatoare de aer')}`}>Purificatoare de aer</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Electrocasnice, Climatizare')}&subcategory=${encodeURIComponent('Aparate de aer conditionat')}`}>Aparate de aer conditionat</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}`}>Gaming, Carti, Birotica</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Console Gaming')}`}>Console Gaming</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Accesorii Gaming')}`}>Accesorii Gaming</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Jocuri Console & PC')}`}>Jocuri Console & PC</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Carti')}`}>Carti</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Filme')}`}>Filme</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Muzica')}`}>Muzica</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Gaming, Carti, Birotica')}&subcategory=${encodeURIComponent('Consumabile si accesorii birou')}`}>Consumabile si accesorii birou</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Jucarii, Articole copii & bebelusi')}`}>Jucarii, Articole copii & bebelusi</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Jucarii, Articole copii & bebelusi')}&subcategory=${encodeURIComponent('Jucarii')}`}>Jucarii</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Jucarii, Articole copii & bebelusi')}&subcategory=${encodeURIComponent('Scutece si servetele')}`}>Scutece si servetele</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Jucarii, Articole copii & bebelusi')}&subcategory=${encodeURIComponent('Igiena si ingrijire')}`}>Igiena si ingrijire</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Jucarii, Articole copii & bebelusi')}&subcategory=${encodeURIComponent('Hrana si accesorii')}`}>Hrana si accesorii</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Ingrijire Personala, Cosmetice')}`}>Ingrijire Personala, Cosmetice</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Ingrijire Personala, Cosmetice')}&subcategory=${encodeURIComponent('Ingrijire personala')}`}>Ingrijire personala</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Ingrijire Personala, Cosmetice')}&subcategory=${encodeURIComponent('Cosmetice')}`}>Cosmetice</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Casa, Gradina, Bricolaj')}`}>Casa, Gradina, Bricolaj</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Casa, Gradina, Bricolaj')}&subcategory=${encodeURIComponent('Gradinarit')}`}>Gradinarit</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Casa, Gradina, Bricolaj')}&subcategory=${encodeURIComponent('Mobilier')}`}>Mobilier</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Casa, Gradina, Bricolaj')}&subcategory=${encodeURIComponent('Saltele')}`}>Saltele</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Casa, Gradina, Bricolaj')}&subcategory=${encodeURIComponent('Sisteme de iluminat')}`}>Sisteme de iluminat</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Casa, Gradina, Bricolaj')}&subcategory=${encodeURIComponent('Scule')}`}>Scule</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Casa, Gradina, Bricolaj')}&subcategory=${encodeURIComponent('Materiale de constructii')}`}>Materiale de constructii</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Sport & Calatorie')}`}>Sport & Calatorie</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Sport & Calatorie')}&subcategory=${encodeURIComponent('Camping')}`}>Camping</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Sport & Calatorie')}&subcategory=${encodeURIComponent('Accesorii sportive')}`}>Accesorii sportive</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Sport & Calatorie')}&subcategory=${encodeURIComponent('Ciclism')}`}>Ciclism</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Sport & Calatorie')}&subcategory=${encodeURIComponent('Imbracaminte si incaltaminte sport')}`}>Imbracaminte si incaltaminte sport</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Sport & Calatorie')}&subcategory=${encodeURIComponent('Fitness si nutritie')}`}>Fitness si nutritie</Link></li>
          </ol>
        </li>
        <li className="menu-item">
          <Link to={`/products?category=${encodeURIComponent('Auto-Moto')}`}>Auto-Moto</Link>
          <ol className="sub-menu">
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Auto-Moto')}&subcategory=${encodeURIComponent('Anvelope si jante')}`}>Anvelope si jante</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Auto-Moto')}&subcategory=${encodeURIComponent('Intretinere')}`}>Intretinere</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Auto-Moto')}&subcategory=${encodeURIComponent('Electronice auto')}`}>Electronice auto</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Auto-Moto')}&subcategory=${encodeURIComponent('Accesorii auto')}`}>Accesorii auto</Link></li>
            <li className="menu-item"><Link to={`/products?category=${encodeURIComponent('Auto-Moto')}&subcategory=${encodeURIComponent('Vehicule electrice')}`}>Vehicule electrice</Link></li>
          </ol>
        </li>
    </ol>
</nav>

  );
}

export default Navbar;
