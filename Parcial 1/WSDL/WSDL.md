# Estructura de un Documento WSDL

Un archivo WSD* es un documento en formato XML estandarizado por el W3C que se utiliza para describir la interfaz pública, las operaciones disponibles y los detalles de conexión de un Servicio Web SOAP. 

Funciona como un contrato formal entre el proveedor y el consumidor del servicio: especifica qué datos recibe, qué datos responde, qué protocolo de transporte utiliza y en qué dirección de red se encuentra alojado.

# Esquema General y Jerarquía

La estructura de un documento WSDL se divide principalmente en dos niveles:
 - Definiciones abstractas: Describen que hace el servicio de manera independiente a la plataforma o transporte (`<types>`, `<message>`, `<portType>`).
- Definiciones concretas: Describen como y donde se invoca el servicio en la red (`<binding>`, `<service>`).


- definitions
 - types: Estructura y tipos de datos (XSD)
 - message: Datos lógicos que se transmiten (parámetros y respuestas)
 - portType: Interfaz abstracta (operaciones o métodos expuestos)
 - binding: Protocolo de transporte y codificación (SOAP / HTTP)
 - Service: Dirección física o URL final del endpoint (port)




## Elementos Principales de WSDL

### 1. Elemento Raíz: `<definitions>`
Es la etiqueta contenedora de todo el documento. En este nodo se configuran los espacios de nombres (**namespaces**) XML y el nombre general del servicio.

* **Atributos clave:**
  * `name`: Nombre descriptivo del archivo de servicio.
  * `targetNamespace`: Espacio de nombres único asociado a los elementos y operaciones declarados.
  * `xmlns:*`: Declaraciones de prefijos estándar (`wsdl`, `soap`, `xsd`, `tns`).

```xml
<definitions name="CalculadoraService"
             targetNamespace="http://ejemplo.com/servicios/calculadora"
             xmlns:tns="http://ejemplo.com/servicios/calculadora"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns="http://schemas.xmlsoap.org/wsdl/">
    <!-- El resto de las etiquetas van aquí -->
</definitions>
```

---

### 2. Tipos de Datos: `<types>`
Define los tipos de datos utilizados en los mensajes intercambiados. Generalmente se especifican mediante esquemas **XSD (XML Schema Definition)** embebidos.

* Permite definir tipos primitivos (`xsd:int`, `xsd:string`, etc.) o estructuras complejas (`xsd:complexType`).

```xml
<types>
    <xsd:schema targetNamespace="http://ejemplo.com/servicios/calculadora">
        <!-- Parámetros de entrada para la operación Sumar -->
        <xsd:element name="SumarRequest">
            <xsd:complexType>
                <xsd:sequence>
                    <xsd:element name="numero1" type="xsd:double"/>
                    <xsd:element name="numero2" type="xsd:double"/>
                </xsd:sequence>
            </xsd:complexType>
        </xsd:element>

        <!-- Parámetros de salida devueltos por la operación Sumar -->
        <xsd:element name="SumarResponse">
            <xsd:complexType>
                <xsd:sequence>
                    <xsd:element name="resultado" type="xsd:double"/>
                </xsd:sequence>
            </xsd:complexType>
        </xsd:element>
    </xsd:schema>
</types>
```

---

### 3. Definición de Mensajes: `<message>`
Declara de forma abstracta los datos que componen una transmisión. Cada mensaje puede contener una o más partes (`<part>`) que apuntan a elementos del esquema definidos en `<types>`.

* Regularmente se configuran pares de mensajes: uno para la petición (*Request*) y otro para la respuesta (*Response*).

```xml
<!-- Mensaje entrante -->
<message name="SumarInputMessage">
    <part name="parameters" element="tns:SumarRequest"/>
</message>

<!-- Mensaje saliente -->
<message name="SumarOutputMessage">
    <part name="parameters" element="tns:SumarResponse"/>
</message>
```

---

### 4. Interfaz de Operaciones: `<portType>`
Equivale a una interfaz (`interface`) en los lenguajes de programación. Define el conjunto de operaciones (métodos) disponibles y asocia cada una con los mensajes de entrada y salida correspondientes.

* **`<operation>`**: Nombre del método invocado por el cliente.
* **`<input>`**: Mensaje de entrada requerido.
* **`<output>`**: Mensaje que el servicio devuelve tras procesar la petición.
* **`<fault>`** *(opcional)*: Mensajes de error o excepciones de negocio.

```xml
<portType name="CalculadoraPortType">
    <operation name="Sumar">
        <input message="tns:SumarInputMessage"/>
        <output message="tns:SumarOutputMessage"/>
    </operation>
</portType>
```

---

### 5. Vinculación y Protocolo: `<binding>`
Asigna un formato de protocolo y codificación concreto a las operaciones abstractas definidas en el `<portType>`. En servicios SOAP, se encarga de fijar el uso de SOAP sobre HTTP.

* **`soap:binding`**: Define el estilo (`document` o `rpc`) y el protocolo de transporte (`http://schemas.xmlsoap.org/soap/http`).
* **`soap:operation`**: Puede definir la acción SOAP (`soapAction`) empleada en la cabecera HTTP.
* **`soap:body`**: Define cómo se serializan los datos (`literal` o `encoded`).

```xml
<binding name="CalculadoraSoapBinding" type="tns:CalculadoraPortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    
    <operation name="Sumar">
        <soap:operation soapAction="http://ejemplo.com/servicios/calculadora/Sumar"/>
        <input>
            <soap:body use="literal"/>
        </input>
        <output>
            <soap:body use="literal"/>
        </output>
    </operation>
</binding>
```

---

### 6. Endpoint y Despliegue: `<service>`
Especifica la ubicación física en red donde el servicio web está disponible para recibir peticiones.

* **`<port>`**: Conecta un `<binding>` específico a una URL concreta mediante `<soap:address>`.

```xml
<service name="CalculadoraService">
    <documentation>Servicio web SOAP para la realización de operaciones matemáticas básicas.</documentation>
    <port name="CalculadoraPort" binding="tns:CalculadoraSoapBinding">
        <soap:address location="https://ejemplo.com/ws/calculadora"/>
    </port>
</service>
```

---

## Ejemplo Completo Integrado

```xml
<?xml version="1.0" encoding="UTF-8"?>
<definitions name="CalculadoraService"
             targetNamespace="http://ejemplo.com/servicios/calculadora"
             xmlns:tns="http://ejemplo.com/servicios/calculadora"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns="http://schemas.xmlsoap.org/wsdl/">

    <!-- 1. Tipos de datos (XSD) -->
    <types>
        <xsd:schema targetNamespace="http://ejemplo.com/servicios/calculadora">
            <xsd:element name="SumarRequest">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="numero1" type="xsd:double"/>
                        <xsd:element name="numero2" type="xsd:double"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
            <xsd:element name="SumarResponse">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="resultado" type="xsd:double"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
        </xsd:schema>
    </types>

    <!-- 2. Definición de mensajes -->
    <message name="SumarInputMessage">
        <part name="parameters" element="tns:SumarRequest"/>
    </message>
    <message name="SumarOutputMessage">
        <part name="parameters" element="tns:SumarResponse"/>
    </message>

    <!-- 3. Interfaz abstracta de operaciones -->
    <portType name="CalculadoraPortType">
        <operation name="Sumar">
            <input message="tns:SumarInputMessage"/>
            <output message="tns:SumarOutputMessage"/>
        </operation>
    </portType>

    <!-- 4. Protocolo y serialización SOAP -->
    <binding name="CalculadoraSoapBinding" type="tns:CalculadoraPortType">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="Sumar">
            <soap:operation soapAction="http://ejemplo.com/servicios/calculadora/Sumar"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>

    <!-- 5. Ubicación física del servicio -->
    <service name="CalculadoraService">
        <port name="CalculadoraPort" binding="tns:CalculadoraSoapBinding">
            <soap:address location="https://ejemplo.com/ws/calculadora"/>
        </port>
    </service>

</definitions>
```