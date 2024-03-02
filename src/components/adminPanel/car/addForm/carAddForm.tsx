import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { RootState } from '../../../../store/configStore/configureStore';
import { getAll } from '../../../../store/car/carSlice';
import { Model } from '../../../../models/models/entity/model';
import { Color } from '../../../../models/colors/entity/color';
import { useAppDispatch } from '../../../../store/configStore/useAppDispatch';
import { getAll as getAllModels } from '../../../../store/model/modelSlice';
import { getAll as getAllColors } from '../../../../store/color/colorSlice';
import { Button, Alert } from 'react-bootstrap';
import { GearType } from '../../../../models/cars/entity/gearType';
import { FuelType } from '../../../../models/cars/entity/fuelType';
import { useAppSelector } from '../../../../store/configStore/useAppSelector';
import { CustomInputComponent } from '../../../../core/formatPlate/CustomInputComponent';
import { MdCancel } from "react-icons/md";
import carService from '../../../../services/carService';
import BooleanSelect from '../booleanSelect/booleanSelect';

const CarAddForm = () => {
    const dispatch = useAppDispatch();
    const [models, setModels] = useState<Model[]>([]);
    const [colors, setColor] = useState<Color[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const allModels = useAppSelector((state: RootState) => state.model.allData);
    const allColors = useAppSelector((state: RootState) => state.color.allData);
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(20), (_, index) => currentYear - index);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    useEffect(() => {
        dispatch(getAllModels());
        dispatch(getAllColors());
        dispatch(getAll());
    }, [dispatch]);

    useEffect(() => {
        if (allModels.length > 0) {
            setModels(allModels);
        }
        if (allColors.length > 0) {
            setColor(allColors);
        }
    }, [allModels, allColors]);

    useEffect(() => {
        const newFileUrls = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(newFileUrls);
        return () => newFileUrls.forEach(url => URL.revokeObjectURL(url));
    }, [selectedFiles]);

    interface MyFormValues {
        kilometer: number;
        year: number;
        dailyPrice: number;
        plate: string;
        gearType: GearType | '';
        fuelType: FuelType | '';
        modelId: number;
        colorId: number;
        isStatus: boolean;
    }

    const initialValues: MyFormValues = {
        kilometer: 0,
        year: 0,
        dailyPrice: 0,
        plate: '',
        gearType: '',
        fuelType: '',
        modelId: 0,
        colorId: 0,
        isStatus: true,
    };

    const validationSchema = Yup.object({
        kilometer: Yup.number().min(0, 'Kilometre negatif olamaz.').required('Kilometre alanı zorunludur.'),
        year: Yup.number().min(2005, 'Yıl 2005\'den büyük olmalıdır.').max(currentYear, `Yıl ${currentYear} veya daha küçük olmalıdır.`).required('Yıl alanı zorunludur.'),
        dailyPrice: Yup.number().min(1, 'Günlük fiyat negatif veya sıfır olamaz.').required('Günlük Fiyat alanı zorunludur.'),
		plate: Yup.string().matches(/^[0-9]{2} [A-Z]{1,3} [0-9]{2,4}$/, 'Plaka formatı geçersiz. Örn: 34 ABC 123').required('Plaka alanı zorunludur.'),
        gearType: Yup.string().required('Vites türü alanı zorunludur.'),
        fuelType: Yup.string().required('Yakıt türü alanı zorunludur.'),
        modelId: Yup.number().min(1, 'Model seçmek zorunludur.').required('Model seçmek zorunludur.'),
        colorId: Yup.number().min(1, 'Renk seçmek zorunludur.').required('Renk seçmek zorunludur.'),
        isStatus: Yup.boolean().required('Durum alanı zorunludur.'),
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
        }
    };
    const removeSelectedFile = (index: number) => {
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        const newPreviewUrls = previewUrls.filter((_, i) => i !== index);

        setPreviewUrls(newPreviewUrls);
        setSelectedFiles(newSelectedFiles);
        URL.revokeObjectURL(previewUrls[index]);
    };

    const handleSubmit = async (values: MyFormValues) => {
        const formData = new FormData();
        const carInfo = {
            kilometer: values.kilometer,
            year: values.year,
            dailyPrice: values.dailyPrice,
            plate: values.plate,
            gearType: values.gearType,
            fuelType: values.fuelType,
            modelId: values.modelId,
            colorId: values.colorId,
            status: values.isStatus,
        };

        formData.append('car', JSON.stringify(carInfo));
        selectedFiles.forEach((file) => {
            formData.append(`images`, file, file.name);
        });

        try {
            const response = await carService.customAdd(formData);
            setIsSuccess(true);
        } catch (error) {
            console.error("Form gönderilirken hata oluştu:", error);
            setIsSuccess(false);
        }
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="kilometer" className="text-black mb-2">Kilometre</label>
                    <Field
                        id="kilometer"
                        name="kilometer"
                        type="number"
                        className="form-control"
                        placeholder="Kilometre Giriniz"
                    />
                    <ErrorMessage name="kilometer" component="div" className="text-danger" />

                    <label htmlFor="year" className="text-black mb-2">Yıl</label>
                    <Field as="select" id="year" name="year" className="form-control">
                        <option value="">Yıl Seçiniz</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="year" component="div" className="text-danger" />

                    <label htmlFor="dailyPrice" className="text-black mb-2">Günlük Fiyat</label>
                    <Field
                        id="dailyPrice"
                        type="number"
                        name="dailyPrice"
                        className="form-control"
                        placeholder="Günlük Fiyat Giriniz"
                    />
                    <ErrorMessage name="dailyPrice" component="div" className="text-danger" />

                    <label htmlFor="plate" className="text-black mb-2">Plaka</label>
                    <Field id="plate" name="plate" component={CustomInputComponent} className="form-control" placeholder="Plaka Giriniz" />
                    <ErrorMessage name="plate" component="div" className="text-danger" />

                    <label htmlFor="image" className="text-black mb-2">Resim Yükle</label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleFileChange}
                        className="form-control"
                        multiple
                    />
                    <div className="image-previews">
                        {previewUrls.map((url, index) => (
                            <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                                <img src={url} alt="Preview" style={{ width: '100px', height: '100px' }} />
                                <button
                                    type="button"
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        padding: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={() => removeSelectedFile(index)}
                                >
                                    <MdCancel style={{ color: 'red', fontSize: '24px' }} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <label htmlFor="isStatus" className="text-black mb-2">Durum</label>
                    <BooleanSelect
                        id="isStatus"
                        name="isStatus"
                        className="form-select"
                    />
                    <ErrorMessage name="isStatus" component="div" className="text-danger" />

                    <label htmlFor="gearType" className="text-black mb-2">Vites Tipi</label>
                    <Field as="select" id="gearType" name="gearType" className="form-select">
                        <option value="">Vites tipi seçiniz</option>
                        <option value={GearType.MANUEL}>Manuel</option>
                        <option value={GearType.AUTO}>Otomatik</option>
                    </Field>
                    <ErrorMessage name="gearType" component="div" className="text-danger" />

                    <label htmlFor="fuelType" className="text-black mb-2">Yakıt Tipi</label>
                    <Field as="select" id="fuelType" name="fuelType" className="form-select">
                        <option value="">Yakıt tipi seçiniz</option>
                        <option value={FuelType.DIESEL}>Dizel</option>
                        <option value={FuelType.ELECTRIC}>Elektrikli</option>
                        <option value={FuelType.HYBRID}>Hibrit</option>
                        <option value={FuelType.GASOLINE}>Benzinli</option>
                    </Field>
                    <ErrorMessage name="fuelType" component="div" className="text-danger" />

                    <label htmlFor="modelId" className="text-black mb-2">Modeller</label>
                    <Field as="select" id="modelId" name="modelId" className="form-select mb-2">
                        <option value="">Model Seçiniz</option>
                        {models.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="modelId" component="div" className="text-danger" />

                    <label htmlFor="colorId" className="text-black mb-2">Renkler</label>
                    <Field as="select" id="colorId" name="colorId" className="form-select mb-2">
                        <option value="">Renk Seçiniz</option>
                        {colors.map(color => (
                            <option key={color.id} value={color.id}>{color.name}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="colorId" component="div" className="text-danger" />

                    <Button className='p-2 mb-2 bg-success' variant="primary" type="submit">Kaydet</Button>
                    <Button className='p-2 mb-2 mx-4 bg-warning' variant="primary" type="reset">Temizle</Button>
                    {isSuccess && <Alert variant="success">Form başarıyla gönderildi!</Alert>}
                </Form>
            </Formik>
        </div>
    );
};

export default CarAddForm;
