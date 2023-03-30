
        const attributeResponseData = {
            normal: {
                mandatory: new Map(),
                nonMandatory: new Map(),
                saleProp: new Map()
            },
            sku: {
                mandatory: new Map(),
                nonMandatory: new Map(),
                saleProp: new Map()
            }
        };

        $('#category_id').change(function(e) {
            e.preventDefault();

            let selectedCategoryId = $(this).val();
            console.log("Category_id: ", selectedCategoryId);

            appendProductDarazAttributes(selectedCategoryId);

        });

        function appendProductDarazAttributes($categoryId) {
            $.ajax({
                type: "GET",
                delay: 1000,
                url: "{{ route('daraz.category.attributes') }}",
                data: {

                    "category_id": $categoryId
                },
                async: true,
                success: function(response) {

                    if (response.result) {
                        console.log("==================Attribute============");
                        // console.log(response.data);
                        manipulateProductAttribute(JSON.parse(response.data));

                        AIZ.plugins.bootstrapSelect('refresh');
                    }
                }
            });
        }

        function manipulateProductAttribute(attributes) {
            attributes.data.forEach((item) => {

                let htmlElement = buildAttributeField(item);
                item.html = htmlElement;

                if (item.attribute_type === "normal") {
                    const key = item.name;

                    if (item.is_sale_prop) {

                        attributeResponseData.normal.saleProp.set(key, item);
                    } else if (item.is_mandatory) {

                        attributeResponseData.normal.mandatory.set(key, item);
                    } else {

                        attributeResponseData.normal.nonMandatory.set(key, item);
                    }


                } else if (item.attribute_type === "sku") {
                    const key = item.name;

                    if (item.is_sale_prop) {
                        // attributeResponseData.sku.saleProp[item.name] = item;
                        attributeResponseData.sku.saleProp.set(key, item);
                    } else if (item.is_mandatory) {

                        attributeResponseData.sku.mandatory.set(key, item);


                    } else {

                        attributeResponseData.sku.nonMandatory.set(key, item);
                    }
                }
            });

            let mandatoryList = [...attributeResponseData.normal.no.keys()];
            // let nameAttribute = attributeResponseData.normal.mandatory.get('name')
            // console.log("Daaaaaaaaa: ", nameAttribute.html);
            let mandatoryIsSaleProp = [...attributeResponseData.normal.saleProp.keys()]
            let skuIsSaleProp = [... attributeResponseData.sku.saleProp.keys()]

            console.log("mandatory.isSaleProp: ", mandatoryIsSaleProp, "sku.isSaleProb", skuIsSaleProp, );
            insertDarazSection(mandatoryList)
        }

        function buildAttributeField(attribute) {
            let name = attribute.name;
            let type = "text";

            let options = attribute.options
            let isRequired = attribute.is_mandatory
            let label = attribute.label

            if (options.length === 0) {
                return generateInputField(label, name, type, isRequired)
            } else if(options.length >  0) {
                return generateSelectField(label, name, type, isRequired, options);
            }

            return null;
        }

        function generateInputField(label, name, type, isRequired) {
            return `
                <div class="form-group row">
                    <label class="col-md-3 col-from-label">
                        ${label}
                        ${isRequired ? '<span class="text-danger">*</span>' : ''}
                    </label>
                    <div class="col-md-8">
                        <input type="${type}" class="form-control aiz-tag-input" name="${name}" placeholder="" ${isRequired ? 'required' : ''}>
                    </div>
                </div>
            `;
        }

        function generateSelectField(label, name, type, isRequired, options) {
            let optionsHtml = '';

            options.forEach((option) => {
                optionsHtml += `<option value="${option.name}">${option.name}</option>`;
            });

            return `
                <div class="form-group row">
                    <label class="col-md-3 col-from-label"> ${label}</label>
                    <div class="col-md-8">
                        <select class="form-control aiz-selectpicker" name="${name}"
                            id="" ${isRequired ? 'required' : ''}>
                            ${optionsHtml}
                        </select>
                    </div>
                </div>
            `;
        }

        function insertDarazSection(elementList) {
            let content = "";

            elementList.forEach((element) => {
                let attribute = attributeResponseData.normal.nonMandatory.get(element);
                content += attribute.html
            });


            // console.log("Insert Daraz Section", element.html)

            // let content = "";
            // content += element.html
            $('#daraz-dynamic-field').html(content);

            AIZ.plugins.bootstrapSelect('refresh');

        }
